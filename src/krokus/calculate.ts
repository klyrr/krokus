export const round = (number: number, decimals: number) => {
  return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

export const trunc = (x: number): number => {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
};

export const getDecimalPart = (number: number): number => {
  const numberAsString = number.toString();
  const indexOfDecimals = numberAsString.indexOf('.');
  if (indexOfDecimals < 0) {
    return 0;
  }
  return Number('0.' + numberAsString.slice(indexOfDecimals + 1));
};

export const countNumberOfDecimals = (number: number): number => {
  const numberAsString = number.toString();
  const indexOfDecimals = numberAsString.indexOf('.');
  if (indexOfDecimals < 0) {
    return 0;
  }
  return numberAsString.slice(indexOfDecimals + 1).length;
};
