import {
  countNumberOfDecimals,
  getDecimalPart,
  round,
  trunc,
} from '../src/krokus/calculate';
import { assert, describe, test } from 'vitest';

describe('Krokus Calculate', () => {
  describe('round', () => {
    test('should round the numbers', () => {
      assert.equal(round(23.442, 2), 23.44);
      assert.equal(round(23.442, 2), 23.44);
      assert.equal(round(23.446, 2), 23.45);
      assert.equal(round(23.44, 1), 23.4);
      assert.equal(round(23.44, 4), 23.44);
      assert.equal(round(432.5579, 3), 432.558);
      assert.equal(round(-432.5579, 3), -432.558);
    });
  });

  describe('trunc', () => {
    test('should trunc the given numbers', () => {
      assert.equal(trunc(23.44), 23);
      assert.equal(trunc(23), 23);
    });
  });

  describe('countNumberOfDecimals', () => {
    test('should return the number of decimals', () => {
      assert.equal(countNumberOfDecimals(23.44), 2);
      assert.equal(countNumberOfDecimals(23), 0);
      assert.equal(countNumberOfDecimals(23.76262), 5);
      assert.equal(countNumberOfDecimals(-23.76262), 5);
    });
  });

  describe('getDecimalPart', () => {
    test('should return the decimals', () => {
      assert.equal(getDecimalPart(23.44), 0.44);
      assert.equal(getDecimalPart(23), 0);
      assert.equal(getDecimalPart(23.76262), 0.76262);
      assert.equal(getDecimalPart(-23.76262), 0.76262);
    });
  });
});
