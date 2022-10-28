import { convertToPrecision, isValidKey } from "./helpers";

describe(('convertToPrecision tests'), () => {
  test('a non-integer number was passed as the first argument', () => {
    expect(convertToPrecision(-1.5213, 1)).toBe(-1.5);
    expect(convertToPrecision(1.5213, 1)).toBe(1.5);
  });

  test('an integer was passed as the first argument', () => {
    expect(convertToPrecision(5, 1)).toBe(5);
  });

  test('passed a non-number as the first argument', () => {
    expect(convertToPrecision('abc', 1)).toBeNaN();
  });

  test('infinity is passed as the first argument', () => {
    expect(convertToPrecision(1 / 0, 1)).toBe(Infinity);
  });

  test('negative precision is passed by the second argument', () => {
    expect(convertToPrecision(1, -1)).toBe(0);
  });

  test('non-numeric precision passed by the second argument', () => {
    expect(convertToPrecision(1, 'bca')).toBeNaN();
  });
});

describe(('isValidKey tests'), () => {
  const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Delete', 'Backspace', 'Home', 'End', 'Tab', '.'];
  const invalidKeys = ['a', '#', 'B', ',', '\\', '!', ' '];

  test.each(validKeys)('the valid key %s was passed', (value) => {
    expect(isValidKey(value)).toBeTruthy();
  });

  test.each(invalidKeys)('invalid key %s was passed', (value) => {
    expect(isValidKey(value)).toBeFalsy();
  });

  test('null or undefined value passed', () => {
    expect(isValidKey(null)).toBeFalsy();
    expect(isValidKey(undefined)).toBeFalsy();
  });
});
