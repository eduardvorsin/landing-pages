'use strict';
export function convertToPrecision(num, precision) {
  return Math.round(num * 10 ** precision) / 10 ** precision;
}

export function isValidKey(value) {
  if (!value) return false;

  let validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Delete', 'Backspace', 'Home', 'End', 'Tab', '.'];

  return validKeys.includes(value);
}
