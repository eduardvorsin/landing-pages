import { formatTime } from "./helpers";

describe('helpers tests', () => {

  test('formatTime passed valid seconds', () => {
    const expectedValue = formatTime(65);
    expect(expectedValue).toMatch('1:05');
  });

  test('formatTime passed invalid seconds', () => {
    const expectedValue = formatTime(1 / 0);
    expect(expectedValue).toMatch('Infinity:NaN');
  });
});
