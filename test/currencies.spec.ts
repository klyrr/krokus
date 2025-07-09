import { assert, describe, test } from 'vitest';
import { formatCurrency, formatNumber } from '../src/krokus';
import { de } from '../src/generated/locales.json';
import { AED, EUR, INR, JPY, USD } from '../src/generated/currencies.json';

describe('Currencies', () => {
  test('should format a price in EUR for de_DE as expected.', () => {
    const locale_de_DE = de;
    const currency_EUR = EUR;
    const format = {
      pattern: locale_de_DE.currency_pattern,
      decimal_sep: locale_de_DE.decimal_sep,
      group_sep: locale_de_DE.group_sep,
      symbol: currency_EUR.symbol,
    };

    assert.equal(formatNumber(20000, format), '20.000,00');
    assert.equal(formatCurrency(20000, format), '20.000,00 €');
  });

  test('should have the expected USD symbol', () => {
    assert.equal(USD.symbol, '$');
    assert.equal(USD.wideSymbol, 'US$');
    assert.equal(USD.code, 'USD');
  });

  test('should have the expected AED symbol', () => {
    assert.equal(AED.symbol, 'AED');
    assert.equal(AED.wideSymbol, 'AED');
    assert.equal(AED.code, 'AED');
  });

  test('should have the expected EUR symbol', () => {
    assert.equal(EUR.symbol, '€');
    assert.equal(EUR.wideSymbol, '€');
    assert.equal(EUR.code, 'EUR');
  });

  test('should have the expected INR symbol', () => {
    assert.equal(INR.symbol, '₹');
    assert.equal(INR.wideSymbol, '₹');
    assert.equal(INR.code, 'INR');
  });

  test('should have the expected JPY symbol', () => {
    assert.equal(JPY.symbol, '¥');
    assert.equal(JPY.wideSymbol, 'JP¥');
    assert.equal(JPY.code, 'JPY');
  });
});
