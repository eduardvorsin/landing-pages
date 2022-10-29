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

describe('makeOperation tests', () => {
  beforeAll(() => {
    document.body.innerHTML =
      '<input class="calculator__input" type="text">';
  });

  const arithmeticOperations = [
    '+',
    '-',
    '/',
    '*',
  ];

  afterEach(() => {
    screen.getByRole('textbox').value = '';
  });

  test('the input value is not a number and the passed operation is not a cleanup operation', () => {
    const input = screen.getByRole('textbox');
    expect(makeOperation('abc', input)).toBeUndefined();
  });

  test('the passed operation is cleanup', () => {
    const input = screen.getByRole('textbox');
    makeOperation('clear', input);
    expect(input).toHaveDisplayValue('0');
  });

  test('the passed operation is negation', () => {
    const input = screen.getByRole('textbox');
    updateInput('5', input);
    makeOperation('negation', input);
    expect(input).toHaveDisplayValue('-5');
  });

  test.each(arithmeticOperations)('the passed operation is a %s', (value) => {
    const input = screen.getByRole('textbox');
    updateInput('-1', input);
    makeOperation(value, input);
    expect(input).toHaveDisplayValue('');
  });

  test('the passed operation is a %', () => {
    const input = screen.getByRole('textbox');
    updateInput('100', input);
    makeOperation('%', input);
    expect(input).toHaveDisplayValue('1');
  });

  test('the passed operation is a square root', () => {
    const input = screen.getByRole('textbox');
    updateInput('25', input);
    makeOperation('sqrt', input);
    expect(input).toHaveDisplayValue('5');
  });
});

describe('evaluate tests', () => {
  it('invalid input passed', () => {
    expect(evaluate(undefined)).toBeUndefined();
  });
});
