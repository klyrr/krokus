'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var round=exports.round=function(a,b){var c=Math.pow;return Math.round(a*c(10,b))/c(10,b)},trunc=exports.trunc=function(a){return 0>a?Math.ceil(a):Math.floor(a)},getDecimalPart=exports.getDecimalPart=function(a){var b=a+'',c=b.indexOf('.');return 0>c?0:+('0.'+b.substr(c+1))},countNumberOfDecimals=exports.countNumberOfDecimals=function(a){var b=a+'',c=b.indexOf('.');return 0>c?0:b.substr(c+1).length};