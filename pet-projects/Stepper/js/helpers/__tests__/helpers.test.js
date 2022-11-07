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
