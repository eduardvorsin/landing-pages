export function isValueEmptyString(value) {
  return typeof value === 'string' && value.trim() === '';
}

export function isValidKey(value) {
  let validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Delete', 'Backspace', 'Home', 'End', 'Tab', '-'];

  return validKeys.includes(value);
}

export function isValidNumber(value) {
  return !Number.isNaN(+value);
}

export function convertToPrecision(num, precision) {
  return Math.round(num * 10 ** precision) / 10 ** precision;
}
