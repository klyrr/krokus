Krokus
=====================

[![Build Status](https://travis-ci.org/klyrr/krokus.svg?branch=master)](https://travis-ci.org/klyrr/krokus)
[![Locales 721](https://img.shields.io/badge/locales-721-green.svg)](https://img.shields.io/badge/locales-721-green.svg)
[![Currencies 303](https://img.shields.io/badge/currencies-303-green.svg)](https://img.shields.io/badge/currencies-303-green.svg)

A provider for localization patterns and a number and currency formatter and parser.

In order to have the all currency and locale patterns in one place.

[ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) is a standard to format currencies.

The data is generated from [CLDR 34](http://unicode.org/Public/cldr/34/core.zip).

## Installation
### npm
`npm install --save krokus`

### yarn
`yarn add krokus`

-----

### Use the krokus formatter
```javascript
import krokus from 'krokus';

const formatPattern = {
  pattern: '#,##0.00 ¤',
  decimal_sep: ',',
  group_sep: '.',
  symbol: '€',
};

> krokus.formatCurrency(10000, formatPattern);
10.000,00 €
```

### Use the krokus parser
```javascript
import krokus from 'krokus';

const formatPattern = {
  pattern: '#,##0.00 ¤',
  decimal_sep: ',',
  group_sep: '.',
  symbol: '€',
};

> krokus.parseCurrency('10.000,00 €', formatPattern);
10000
```

### Access the generated currency and locale settings
```javascript
import krokus from 'krokus';

> krokus.locales.de_DE
{ decimal_sep: ',',
  group_sep: '.',
  number_pattern: '#,##0.###',
  currency_pattern: '#,##0.00 ¤' }

> krokus.currencies.EUR
{ symbol: '€', wideSymbol: '€', code: 'EUR' }
```

### Real-life example

Use the krokus calls in your functions:

```javascript
import krokus from 'krokus';

export const formatNumber = (amount, locale) => {
  const format = krokus.locales[locale];
  format.pattern = format.number_pattern;
  return krokus.formatNumber(amount, format);
};

export const formatCurrency = (amount, locale, currency) => {
  if (!currency) {
    return formatNumber(amount, locale);
  }

  const localeData = krokus.locales[locale];
  const currencyData = krokus.currencies[currency.code];

  return krokus.formatCurrency(amount, {
    pattern: localeData.currency_pattern,
    decimal_sep: localeData.decimal_sep,
    group_sep: localeData.group_sep,
    symbol: currencyData.wideSymbol
  });
};
```

#### Run the tests if the formats are still generating the expected formatted numbers in JS

```
yarn

yarn test
```

#### Generate the krokus number formatter from the es6 files

```
yarn

yarn run compile
```

#### Create the up-to-date version of the json files

```
bundle install

rake update
```
