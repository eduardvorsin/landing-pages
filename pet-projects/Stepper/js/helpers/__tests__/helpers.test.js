import { convertToPrecision, isValidKey, isValidNumber, isValueEmptyString } from "../helpers";

describe('isValueEmptyString tests', () => {
  test('the passed value is not a string', () => {
    expect(isValueEmptyString(1)).toBeFalsy();
    expect(isValueEmptyString(true)).toBeFalsy();
    expect(isValueEmptyString({})).toBeFalsy();
  });

  test('the passed value is not empty string', () => {
    expect(isValueEmptyString('1   ')).toBeFalsy();
    expect(isValueEmptyString('   true')).toBeFalsy();
    expect(isValueEmptyString(' abcdf ')).toBeFalsy();
  });

  test('the passed value is an empty string', () => {
    expect(isValueEmptyString('')).toBeTruthy();
    expect(isValueEmptyString(' ')).toBeTruthy();
  });
});

describe('isValidKey tests', () => {
  const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Delete', 'Backspace', 'Home', 'End', 'Tab'];
  const invalidKeys = ['a', ' ', '#', 'C', '`', '/', '\\'];

  test.each(validKeys)('the valid key %s was passed', (value) => {
    expect(isValidKey(value)).toBeTruthy();
  });

  test.each(invalidKeys)('the invalid key %s was passed', (value) => {
    expect(isValidKey(value)).toBeFalsy();
  });
});


describe('isValidNumber tests', () => {
  test('invalid value passed', () => {
    expect(isValidNumber('abc')).toBeFalsy();
  });

  test('valid value passed', () => {
    expect(isValidNumber('1')).toBeTruthy();
  });
});
