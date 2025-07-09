import { assert, describe, test } from 'vitest';
import localeConfig from '../src/generated/locales.json';

describe('Locales', () => {
  describe('FR', () => {
    test('should have the expected patterns for fr', () => {
      assert.equal(localeConfig.fr.group_sep, ' ');
      assert.equal(localeConfig.fr.decimal_sep, ',');
      assert.equal(localeConfig.fr.number_pattern, '#,##0.###');
      assert.equal(localeConfig.fr.currency_pattern, '#,##0.00 ¤');
    });
    test('should have the expected patterns for fr_CA', () => {
      assert.equal(localeConfig.fr_CA.group_sep, ' ');
      assert.equal(localeConfig.fr_CA.decimal_sep, ',');
      assert.equal(localeConfig.fr_CA.number_pattern, '#,##0.###');
      assert.equal(localeConfig.fr_CA.currency_pattern, '#,##0.00 ¤');
    });
    test('should have the expected patterns for fr_CH', () => {
      assert.equal(localeConfig.fr_CH.group_sep, ' ');
      assert.equal(localeConfig.fr_CH.decimal_sep, ',');
      assert.equal(localeConfig.fr_CH.number_pattern, '#,##0.###');
      assert.equal(
        localeConfig.fr_CH.currency_pattern,
        '#,##0.00 ¤;-#,##0.00 ¤'
      );
    });
  });

  describe('EN', () => {
    test('should have the expected patterns for en', () => {
      assert.equal(localeConfig.en.group_sep, ',');
      assert.equal(localeConfig.en.decimal_sep, '.');
      assert.equal(localeConfig.en.number_pattern, '#,##0.###');
      assert.equal(localeConfig.en.currency_pattern, '¤#,##0.00');
    });

    test('should have the expected patterns for en_IE', () => {
      assert.equal(localeConfig.en_IE.group_sep, ',');
      assert.equal(localeConfig.en_IE.decimal_sep, '.');
      assert.equal(localeConfig.en_IE.number_pattern, '#,##0.###');
      assert.equal(localeConfig.en_IE.currency_pattern, '¤#,##0.00');
    });

    test('should have the expected patterns for en_IN', () => {
      assert.equal(localeConfig.en_IN.group_sep, ',');
      assert.equal(localeConfig.en_IN.decimal_sep, '.');
      assert.equal(localeConfig.en_IN.number_pattern, '#,##,##0.###');
      assert.equal(localeConfig.en_IN.currency_pattern, '¤ #,##,##0.00');
    });
  });

  describe('AR', () => {
    test('should have the expected patterns for ar', () => {
      assert.equal(localeConfig.ar.group_sep, ',');
      assert.equal(localeConfig.ar.decimal_sep, '.');
      assert.equal(localeConfig.ar.number_pattern, '#,##0.###');
      assert.equal(localeConfig.ar.currency_pattern, '¤ #,##0.00');
    });

    test('should have the expected patterns for ar_AE', () => {
      assert.equal(localeConfig.ar_AE.group_sep, ',');
      assert.equal(localeConfig.ar_AE.decimal_sep, '.');
      assert.equal(localeConfig.ar_AE.number_pattern, '#,##0.###');
      assert.equal(localeConfig.ar_AE.currency_pattern, '¤ #,##0.00');
    });
  });

  describe('UK', () => {
    test('should have the expected patterns for uk', () => {
      assert.equal(localeConfig.uk.group_sep, ' ');
      assert.equal(localeConfig.uk.decimal_sep, ',');
      assert.equal(localeConfig.uk.number_pattern, '#,##0.###');
      assert.equal(localeConfig.uk.currency_pattern, '#,##0.00 ¤');
    });

    test('should have the expected patterns for uk_UA', () => {
      assert.equal(localeConfig.uk_UA.group_sep, ' ');
      assert.equal(localeConfig.uk_UA.decimal_sep, ',');
      assert.equal(localeConfig.uk_UA.number_pattern, '#,##0.###');
      assert.equal(localeConfig.uk_UA.currency_pattern, '#,##0.00 ¤');
    });
  });
});
