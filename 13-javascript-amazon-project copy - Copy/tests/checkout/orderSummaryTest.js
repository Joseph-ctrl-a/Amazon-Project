import {renderOrderSummary} from "../../scripts/checkout/orderSummary.js"
import { loadFromStorage, cart } from "../../data/cart.js";
import { renderPaymentSummary } from "../../scripts/checkout/paymentSummary.js";

const productId1 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
const productId2 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';


describe('Test Suite: renderOrderSummary', () => {
    beforeEach(() => {
      document.querySelector('.js-test-div')
      .innerHTML = `
          <div class="js-checkout-header"></div>
          <div class="js-order-summary"></div>
          <div class="js-payment-summary"></div>
                   `
      spyOn(localStorage, 'setItem');
      spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify(
          [{
            productId:  productId1,
            quantity: 2,
            deliveryOptionId: '1'
          }, {
            productId: productId2,
            quantity: 1,
            deliveryOptionId: '1'
          }]
        );
      });
        loadFromStorage();
  
        renderOrderSummary();
        renderPaymentSummary();
    });

    afterEach(() => {
            document.querySelector('.js-test-div')
      .innerHTML = ``
    });
  it('displays the cart', () => {
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);
   expect(
    document.querySelector(`.js-product-quantity-${productId1}`).innerText
       ).toContain('Quantity: 2');
   expect(
    document.querySelector(`.js-product-quantity-${productId2}`).innerText
       ).toContain('Quantity: 1');
    expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toEqual('Intermediate Size Basketball');
    expect(document.querySelector('.js-product-price').innerText).toContain('$')
  });

  it('removes a product', () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);

    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);

    expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not
    .toEqual(!null);
 
    expect(cart.length).toEqual(1);

    expect(cart[0].productId).toEqual(productId2);
  });
  
  it('updates the delivery option', () => {
    document.querySelector(`.js-delivery-option-${productId1}-3`).click();

    expect(
      document.querySelector(`.js-delivery-option-input-${productId1}-3`).checked
  ).toEqual(true);
    expect(cart.length).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual('3');
    expect(cart[0].productId).toEqual(productId1);
    expect(document.querySelector('.js-payment-summary-money').innerText).toEqual('$9.99');
    expect(
      document.querySelector('.js-payment-summary-total').innerText
    ).toEqual('$69.07')
  });
});

