import {formatCurrency} from '../../scripts/utils/money.js'

describe('Test Suite: formatCurrecny', () => {
  it('coverts cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00')
  });

  it('works with rounding up', () => {
    expect(formatCurrency(2095.5)).toEqual('20.96')
  });
});