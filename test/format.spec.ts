/* eslint-disable no-irregular-whitespace */

import { assert, describe, test } from 'vitest';

import {
  checkFormattedNumber,
  formatDecimalPart,
  formatIntegerPart,
  getNumberOfDecimals,
  getNumberOfRequiredDecimals,
  getSizeOfGroup,
  isValidFormatPattern,
  replaceFormatWithNumber,
} from '../src/krokus/format';

describe('Krokus Format', () => {
  describe('getNumberOfDecimals', () => {
    test('should return the number of decimals from the format', () => {
      //  assert.equal(getNumberOfDecimals('¤ #,##0.00;¤ -#,##0.00'), 2);
      assert.equal(getNumberOfDecimals('¤ #,##,##0.00'), 2);
      assert.equal(getNumberOfDecimals('#,##0.00 ¤'), 2);
      assert.equal(getNumberOfDecimals('#,##0.0000 ¤'), 4);
      assert.equal(getNumberOfDecimals(' ¤ #,##0.00'), 2);
      assert.equal(getNumberOfDecimals(' ¤ #,##0.000'), 3);
      assert.equal(getNumberOfDecimals('#,##0.00'), 2);
      assert.equal(getNumberOfDecimals('#,##0'), 0);
      assert.equal(getNumberOfDecimals('#,##0.###'), 3);
      assert.equal(getNumberOfDecimals('#,##0.00#'), 3);
      assert.equal(getNumberOfDecimals('#,##0.00# ¤'), 3);
    });
    test('should return the number of decimals with formats that use non-breaking spaces', () => {
      assert.equal(getNumberOfDecimals('#,##0.00 ¤'), 2);
    });
  });

  describe('getNumberOfRequiredDecimals', () => {
    test('should return the numbers of required decimals', () => {
      assert.equal(getNumberOfRequiredDecimals('#,##0.00'), 2);
      assert.equal(getNumberOfRequiredDecimals('#,##0.00#'), 2);
      assert.equal(getNumberOfRequiredDecimals('#,##0'), 0);
      assert.equal(getNumberOfRequiredDecimals('#,##0.###'), 0);
    });
  });

  describe('getSizeOfGroups', () => {
    test('should return the size of the groups', () => {
      assert.deepEqual(getSizeOfGroup('#0.00#'), [2]);
      assert.deepEqual(getSizeOfGroup('#,##0.00'), [3]);
      assert.deepEqual(getSizeOfGroup('#,##0'), [3]);
      assert.deepEqual(getSizeOfGroup('¤ #,##0.00;¤ -#,##0.00'), [3]);
      assert.deepEqual(getSizeOfGroup('¤ #,##,##0.00;¤ -#,##,##0.00'), [3,2]);
      assert.deepEqual(getSizeOfGroup('¤ #,##,##0.00'), [3,2]);
      assert.deepEqual(getSizeOfGroup('¤ #,##,##,##0.00'), [3,2,2]);
    });
  });

  describe('isValidFormatPattern', () => {
    test('should return the number of decimals from the format', () => {
      assert.equal(isValidFormatPattern('#,##0.00 ¤'), true);
      assert.equal(isValidFormatPattern('#,##0.00'), true);
      assert.equal(isValidFormatPattern('#,##0'), true);
      assert.equal(isValidFormatPattern('¤ #,##0.00;¤ -#,##0.00'), true);
      assert.equal(isValidFormatPattern('¤ #,##,##0.00'), true);
      assert.equal(isValidFormatPattern(' ¤ #,##,##0.00'), true);

      assert.throws(
        () => isValidFormatPattern('f ¤ #,##,##0.00'),
        'Currency must be first or last character of pattern: f ¤ #,##,##0.00'
      );
      assert.throws(
        () => isValidFormatPattern('#.##,##0'),
        'Group separator must be before decimal separator: #.##,##0'
      );
      assert.equal(isValidFormatPattern('#,.##0dds'), false);
      assert.equal(isValidFormatPattern('#,33.8'), false);
    });
  });

  describe('replaceFormatWithNumber', () => {
    test('should replace the number in the given format', () => {
      assert.equal(replaceFormatWithNumber('#,##0.00', '10.000'), '10.000');
      assert.equal(
        replaceFormatWithNumber('#,##0.0000 ¤', '10.000'),
        '10.000 ¤'
      );
    });
  });

  describe('formatIntegerPart', () => {
    test('should replace the number in the given format', () => {
      assert.equal(formatIntegerPart(120000, '#,##0.00', 'x'), '120x000');
      assert.equal(formatIntegerPart(12000000, '#,##,##0.00', 'x'), '1x20x00x000');
      assert.equal(formatIntegerPart(0, '#,##0.0000 ¤', 'x'), '0');
    });
  });

  describe('formatDecimalPart', () => {
    test('should replace the number in the given format', () => {
      // number, decimalPart, numberOfMaximumDecimals, numberOfMinimumDecimals, decimalSeparator
      assert.equal(formatDecimalPart(12000.33, 0.33, 2, 2, ','), ',33');
      assert.equal(formatDecimalPart(12000.353, 0.35, 2, 2, ','), ',35');
      assert.equal(formatDecimalPart(12000.35, 0.35, 3, 3, ','), ',350');
      assert.equal(formatDecimalPart(12000, 0, 2, 0, ','), '');
    });
  });

  describe('checkFormattedNumber', () => {
    test('should validate the given number', () => {
      assert.equal(checkFormattedNumber('10 000,44', ',', ' '), true);
      assert.equal(checkFormattedNumber('10,000.44', '.', ','), true);
      assert.equal(checkFormattedNumber('10.000', '.', ','), true);
      assert.equal(checkFormattedNumber('-10.000', '.', ','), true);
      assert.equal(checkFormattedNumber('-10.000,54', ',', '.'), true);
      assert.equal(checkFormattedNumber('0', '.', ','), true);
    });

    test('should return false', () => {
      assert.equal(checkFormattedNumber('10.000,44', '.', ','), false);
      assert.equal(checkFormattedNumber('10 000,44', ',', '.'), false);
      assert.equal(checkFormattedNumber('-10 000,44', ',', '.'), false);
      assert.equal(checkFormattedNumber('s,33.8', '.', ','), false);
      assert.equal(checkFormattedNumber('#,33.8', '.', ','), false);
      assert.equal(checkFormattedNumber('hello', '.', ','), false);
      assert.equal(checkFormattedNumber('-', '.', ','), false);
      assert.equal(checkFormattedNumber('-,', '.', ','), false);
    });
  });
});
