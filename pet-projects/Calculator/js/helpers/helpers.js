'use strict';
export function convertToPrecision(num, precision) {
  return Math.round(num * 10 ** precision) / 10 ** precision;
}
