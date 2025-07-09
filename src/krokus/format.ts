import { countNumberOfDecimals } from './calculate';

export const CURRENCY_SYMBOL = '¤';

const DECIMAL_SEPARATOR = '.';
const GROUP_SEPARATOR = ',';
const ALLOWED_NUMBER_FORMAT_CHARS = ',#0;';
const ALLOWED_GENERAL_FORMAT_CHARS =
  ALLOWED_NUMBER_FORMAT_CHARS + '- ' + CURRENCY_SYMBOL;

const regexpGroupSeparator = new RegExp(GROUP_SEPARATOR, 'g');

export class PatternFormatError extends Error {}

export const isValidFormatPattern = (givenFormat: string): boolean => {
  let format = givenFormat.trim();
  const posGroupSeparator = format.indexOf(GROUP_SEPARATOR);
  const posDecimalSeparator = format.indexOf(DECIMAL_SEPARATOR);

  // group separator must be before decimal separator
  if (posDecimalSeparator >= 0 && posDecimalSeparator < posGroupSeparator) {
    throw new PatternFormatError(
      'Group separator must be before decimal separator: ' + givenFormat
    );
  }

  // currency must be first or last character of pattern or non-exiting
  const posCurrencySymbol = format.indexOf(CURRENCY_SYMBOL);
  if (
    posCurrencySymbol !== 0 &&
    posCurrencySymbol !== -1 &&
    posCurrencySymbol !== format.length - 1
  ) {
    throw new PatternFormatError(
      'Currency must be first or last character of pattern: ' + givenFormat
    );
  }

  format = format.replace(/\./g, '').trim();
  format = replaceChars(format, ALLOWED_GENERAL_FORMAT_CHARS);
  return format.length === 0;
};

export const formatIntegerPart = (
  integerPart: number,
  pattern: string,
  groupSeparator: string
): string => {
  let integerPartAsString = String(integerPart);
  const groupSize = getSizeOfGroup(pattern);

  const length = integerPartAsString.length;

  let groupIndex = 0;
  let i = length - groupSize[groupIndex];

  while (i > 0) {
    integerPartAsString =
      integerPartAsString.slice(0, i) +
      groupSeparator +
      integerPartAsString.slice(i);
    if (groupSize.length - 1 > groupIndex) {
      groupIndex++;
    }
    i = i - groupSize[groupIndex];
  }

  return integerPartAsString;
};

export const formatDecimalPart = (
  number: number,
  decimalPart: number,
  numberOfMaximumDecimals: number,
  numberOfMinimumDecimals: number,
  decimalSeparator: string
): string => {
  if (decimalPart === 0 && numberOfMinimumDecimals === 0) {
    return '';
  }
  if (decimalPart === 0) {
    return decimalSeparator + new Array(numberOfMinimumDecimals + 1).join('0');
  }

  if (numberOfMinimumDecimals > 0 || numberOfMaximumDecimals > 0) {
    const numberOfActualDecimals = countNumberOfDecimals(number);
    // cut the '0.'
    const decimalPartString = String(decimalPart).slice(2);
    const formattedDecimalPart = addZerosIfNeeded(
      numberOfMinimumDecimals,
      Math.min(numberOfActualDecimals, numberOfMaximumDecimals),
      decimalPartString
    );

    return decimalSeparator + formattedDecimalPart;
  }

  return '';
};

const replaceChars = (
  pattern: string,
  charsToBeReplaced: string,
  replacement = ''
): string => {
  // pattern.replace(new RegExp(/${charsToBeReplaced}/, 'g'), replacement).trim();
  for (let i = 0; i < charsToBeReplaced.length; i++) {
    pattern = pattern
      .replace(new RegExp(charsToBeReplaced[i], 'g'), replacement)
      .trim();
  }
  return pattern;
};

const addZerosIfNeeded = (
  numberOfMinimumDecimals: number,
  numberOfActualDecimals: number,
  decimalPartString: string
): string => {
  const zerosToAdd = numberOfMinimumDecimals - decimalPartString.length;

  return zerosToAdd <= 0
    ? decimalPartString.slice(0, numberOfActualDecimals)
    : decimalPartString + new Array(zerosToAdd + 1).join('0');
};

export const replaceFormatWithNumber = (
  pattern: string,
  formattedNumber: string
): string => {
  pattern = pattern.replace(/\./g, '@').trim();
  pattern = replaceChars(pattern, ALLOWED_NUMBER_FORMAT_CHARS, '@');
  pattern = pattern.replace('@', formattedNumber);
  return pattern.split('@').join('');
};

export const getNumberOfDecimals = (pattern: string): number => {
  const posDecimalSeparator = pattern.indexOf(DECIMAL_SEPARATOR);
  if (posDecimalSeparator < 0) {
    return 0;
  }

  let index = posDecimalSeparator + 1;
  while (pattern.charAt(index) === '0' || pattern.charAt(index) === '#') {
    index++;
  }

  return index - posDecimalSeparator - 1;
};

export const getNumberOfRequiredDecimals = (pattern: string): number => {
  const posDecimalSeparator = pattern.indexOf(DECIMAL_SEPARATOR);
  if (posDecimalSeparator < 0) {
    return 0;
  }

  let index = posDecimalSeparator + 1;
  while (pattern.charAt(index) === '0') {
    index++;
  }

  return index - posDecimalSeparator - 1;
};

export const getSizeOfGroup = (format: string): number[] => {
  const groupSeparatorAmount = format.match(regexpGroupSeparator)?.length || 0;
  const posGroupSeparator = format.indexOf(GROUP_SEPARATOR);
  const posDecimalSeparator = format.indexOf(DECIMAL_SEPARATOR);

  if (groupSeparatorAmount <= 1) {
    if (posDecimalSeparator < 0) {
      return [format.length - posGroupSeparator - 1];
    }
    return [posDecimalSeparator - posGroupSeparator - 1];
  }

  // 2 or more groups

  let lastGroupSeparator = posGroupSeparator;
  let i;
  let result: number[] = [];
  while (
    ((i = format.indexOf(GROUP_SEPARATOR, lastGroupSeparator + 1)),
    i !== -1 && i < posDecimalSeparator)
  ) {
    result.push(i - lastGroupSeparator - 1);
    lastGroupSeparator = i;
  }
  result.push(posDecimalSeparator - lastGroupSeparator - 1);

  return result.reverse();
};

/**
 * formattedNumber is a string and it has to be validated if it is a valid number
 *
 * @param formattedNumber
 * @param decimalSep
 * @param groupSep
 * @returns if it is a valid formatted number
 */
export const checkFormattedNumber = (
  formattedNumber: string,
  decimalSep: string,
  groupSep: string
): boolean => {
  const allowedChars = `[${decimalSep}${groupSep}-\\d]`;
  const hasNotAllowedChars = formattedNumber.replace(
    new RegExp(allowedChars, 'g'),
    ''
  );

  if (hasNotAllowedChars.length > 0) {
    return false;
  }

  const posGroupSeparator = formattedNumber.indexOf(groupSep);
  const posDecimalSeparator = formattedNumber.indexOf(decimalSep);

  // group separator must be before decimal separator
  if (posDecimalSeparator >= 0 && posDecimalSeparator < posGroupSeparator) {
    return false;
  }
  const hasOnlyDigits = new RegExp(/\d/, 'g');

  if (!hasOnlyDigits.test(formattedNumber)) {
    return false;
  }

  const splitNumber = formattedNumber.split(decimalSep);
  return splitNumber.length === 2 || splitNumber.length === 1;
};
