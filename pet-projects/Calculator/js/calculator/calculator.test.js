import { screen } from '@testing-library/dom';
import { evaluate, makeOperation, updateInput } from "./calculator";

describe('updateInput tests', () => {
  beforeAll(() => {
    document.body.innerHTML =
      '<input class="calculator__input" type="text">';
  });

  afterEach(() => {
    screen.getByRole('textbox').value = '';
  });

  test('the value . was passed', () => {
    const input = screen.getByRole('textbox');

    expect(updateInput('.', input)).toBeUndefined();
  });

  test('the value 0 was passed', () => {
    const input = screen.getByRole('textbox');

    updateInput('0', input);
    updateInput('0', input);
    expect(screen.getByRole('textbox')).toHaveDisplayValue('0');
  });

  test('the passed value is any number', () => {
    const input = screen.getByRole('textbox');

    updateInput('1', input);
    updateInput('5', input);
    expect(screen.getByRole('textbox')).toHaveDisplayValue('15');
  });

  test('invalid input element passed', () => {
    expect(updateInput('1', undefined)).toBeUndefined();
  });
});
