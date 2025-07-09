import { assert, describe, test } from 'vitest';
import {
  formatCurrency,
  formatNumber,
  parseCurrency,
  parseNumber,
  FormatPattern,
} from '../src/krokus';
import locales from '../src/generated/locales.json';

describe('krokus', () => {
  describe('formatter', () => {
    test('should format the numbers', () => {
      const formatPattern: FormatPattern = {
        pattern: '#,##0.00',
        decimal_sep: ',',
        group_sep: '.',
      };
      assert.equal(formatNumber(10000, formatPattern), '10.000,00');
      assert.equal(formatNumber(200000000, formatPattern), '200.000.000,00');
      assert.equal(formatNumber(432.55, formatPattern), '432,55');
      assert.equal(formatNumber(432.5, formatPattern), '432,50');
      // assert.equal(formatNumber(-432.5, formatPattern), '-432,50');
    });

    test('should format the numbers without trailing numbers', () => {
      const formatPattern = {
        pattern: '#,##0.###',
        decimal_sep: ',',
        group_sep: '.',
      };

      assert.equal(formatNumber(10000, formatPattern), '10.000');
      assert.equal(formatNumber(200000000, formatPattern), '200.000.000');
      assert.equal(formatNumber(432.55, formatPattern), '432,55');
      assert.equal(formatNumber(432.5577, formatPattern), '432,558');
      // assert.equal(formatNumber(-432.5577, formatPattern), '432,558');
    });

    test('should format the currencies', () => {
      const formatCurrencyPattern: FormatPattern = {
        pattern: locales.de_DE.currency_pattern,
        decimal_sep: locales.de_DE.decimal_sep,
        group_sep: locales.de_DE.group_sep,
        symbol: '€',
      };

      assert.equal(formatCurrency(10000, formatCurrencyPattern), '10.000,00 €');
    });

    test('should format the currencies for USD', () => {
      const formatCurrencyPatternForUSD = {
        pattern: '¤#,##0.00',
        decimal_sep: '.',
        group_sep: ',',
        symbol: '$',
      };

      assert.equal(
        formatCurrency(10000000, formatCurrencyPatternForUSD),
        '$10,000,000.00'
      );
    });

    test('should format the currency for negative and positive numbers', () => {
      const formatCurrencyPattern = {
        pattern: '#,##0.00 ¤',
        decimal_sep: ',',
        group_sep: '.',
        symbol: '€',
      };

      assert.equal(formatCurrency(10000, formatCurrencyPattern), '10.000,00 €');
      assert.equal(
        formatCurrency(-10000, formatCurrencyPattern),
        '-10.000,00 €'
      );
    });

    test('should format the format not currency', () => {
      const wrongPattern = '#,##0.00 ¤ l';
      const wrongFormatCurrencyPattern = {
        pattern: wrongPattern,
        decimal_sep: ',',
        group_sep: '.',
        symbol: '€',
      };

      try {
        const notDefined = formatCurrency(10000, wrongFormatCurrencyPattern);
        assert.equal(notDefined, 'This must not happen');
      } catch (e) {
        assert.equal(
          e.message,
          'Currency must be first or last character of pattern: ' + wrongPattern
        );
      }
    });
  });

  describe('parser', () => {
    test('should parse the numbers', () => {
      const formatPattern = {
        pattern: '#,##0.00',
        decimal_sep: ',',
        group_sep: '.',
      };

      assert.equal(parseNumber('10.000,00', formatPattern), 10000);
      assert.equal(parseNumber('200.000.000,00', formatPattern), 200000000);
      assert.equal(parseNumber('432,55', formatPattern), 432.55);
      assert.equal(parseNumber('432,50', formatPattern), 432.5);
      assert.equal(parseNumber('10.000', formatPattern), 10000);
      assert.equal(parseNumber('200.000.000', formatPattern), 200000000);
      assert.equal(parseNumber('432,558', formatPattern), 432.558);

      assert.equal(parseNumber('-432,55', formatPattern), -432.55);
    });

    test('should parse the currencies', () => {
      const formatPattern = {
        pattern: '#,##0.00 ¤',
        decimal_sep: ',',
        group_sep: '.',
        symbol: '€',
      };

      assert.equal(parseCurrency('10.000,00 €', formatPattern), 10000);
      assert.equal(parseCurrency('200.000.000,00 €', formatPattern), 200000000);
      assert.equal(parseCurrency('432,55 €', formatPattern), 432.55);
      assert.equal(parseCurrency('432,50 €', formatPattern), 432.5);
      assert.equal(parseCurrency('10.000 €', formatPattern), 10000);
      assert.equal(parseCurrency('200.000.000 €', formatPattern), 200000000);
      assert.equal(parseCurrency('€432,558', formatPattern), 432.558);

      assert.equal(parseCurrency('-432,55 €', formatPattern), -432.55);
      assert.equal(parseCurrency('€ -432,55', formatPattern), -432.55);
    });

    test('should parse swiss currencies', () => {
      const formatPattern = {
        pattern: '#,##0.00 ¤',
        decimal_sep: ',',
        group_sep: ' ',
        symbol: 'CHF',
      };

      try {
        const notDefined = parseCurrency('10.000,00 CHF', formatPattern);
        // this should not happen
        assert.equal(notDefined, 42);
      } catch (e) {
        assert.equal(e, 'Given formatted number is wrong: 10.000,00');
      }

      assert.equal(parseCurrency('10 000,00 CHF', formatPattern), 10000);
    });
  });
});
