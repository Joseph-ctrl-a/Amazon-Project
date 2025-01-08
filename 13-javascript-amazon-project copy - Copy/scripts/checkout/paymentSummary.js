import { cart, calculateCartQuantity } from "../../data/cart.js";
import { getDelieveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
export function renderPaymentSummary() {
  let productPriceCents = 0; // Total Items Price
  let shippingPriceCents = 0; //Total Shipping Price
  let totalCartQuantity = calculateCartQuantity();
  cart.forEach(cartItem => {
    // Calculating Total Cart Quantity
    // Calculating Total Items Price
    const matchingProduct = getProduct(cartItem.productId);
        productPriceCents += (cartItem.quantity * matchingProduct.priceCents);
    // Calculating Total Shippping Price
    const deliveryOption = getDelieveryOption(cartItem.deliveryOptionId, cartItem);
       shippingPriceCents += deliveryOption.priceCents;
  });
    // Total Before Tax
    
    const totalBeforeTax = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTax * 0.1;
    const totalCents = totalBeforeTax + taxCents
    
    const paymentSummaryHTML = `
            <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${totalCartQuantity}):</div>
          <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">
          $${formatCurrency(shippingPriceCents)}
          </div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>
    `

    document.querySelector('.js-payment-summary')
      .innerHTML = paymentSummaryHTML;
}


// we need to change Items.
// change shipping
//we need to change total before tax
// calculate tax
// calculate order Total

// Calculate Items function
// calcuate shipping
// 