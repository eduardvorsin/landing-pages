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
  const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Delete', 'Backspace', 'Home', 'End', 'Tab', '-'];
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

describe(('convertToPrecision tests'), () => {
  test('a non-integer number was passed as the first argument', () => {
    expect(convertToPrecision(-3.2245, 1)).toBe(-3.2);
    expect(convertToPrecision(3.2245, 2)).toBe(3.22);
  });

  test('an integer was passed as the first argument', () => {
    expect(convertToPrecision(67, 1)).toBe(67);
  });

  test('passed a non-number as the first argument', () => {
    expect(convertToPrecision('cbaf', 1)).toBeNaN();
  });

  test('negative infinity is passed as the first argument', () => {
    expect(convertToPrecision(- 1 / 0, 1)).toBe(-Infinity);
  });

  test('negative precision is passed by the second argument', () => {
    expect(convertToPrecision(5, -1)).toBe(10);
  });

  test('non-numeric precision passed by the second argument', () => {
    expect(convertToPrecision(1, 'cca')).toBeNaN();
  });
});

