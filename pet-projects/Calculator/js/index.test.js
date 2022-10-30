import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { keydownHandler as originalKeydownHandler } from './handlers/handlers';
import { pointerdownHandler as originalPointerdownHandler } from './handlers/handlers';

function calculatorUISetup(keydownHandler, pointerdownHandler) {
  document.body.innerHTML =
    `<div id="calculator" class="calculator" data-testid="calculator">
	<input class="calculator__input" type="text">
	<div class="calculator__panel calculator-panel">
		<button class="calculator-panel__key calculator-panel__key--operation" data-operation="clear" data-key="operation"
			aria-label="clear input">
			C
		</button>
		<button class="calculator-panel__key calculator-panel__key--operation" data-operation="negation"
			data-key="operation" aria-label="add/remove minus">
			+/-
		</button>
		<button class="calculator-panel__key calculator-panel__key--operation" data-operation="%" data-key="operation"
			aria-label="find the percentage">
			%
		</button>
		<button class="calculator-panel__key calculator-panel__key--operation" data-operation="/" data-key="operation"
			aria-label="division">
			/
		</button>
		<button class="calculator-panel__key calculator-panel__key--operation" data-operation="*" data-key="operation"
			aria-label="multiplication">
			*
		</button>
		<button class="calculator-panel__key calculator-panel__key--operation" data-operation="-" data-key="operation"
			aria-label="subtraction">
			-
		</button>
		<button class="calculator-panel__key calculator-panel__key--operation" data-operation="+" data-key="operation"
			aria-label="addition">
			+
		</button>
		<button class="calculator-panel__key calculator-panel__key--operation" data-operation="sqrt" data-key="operation"
			aria-label="finding the square root">
			√
		</button>
		<button class="calculator-panel__key calculator-panel__key--operation" data-operation="=" data-key="operation"
			aria-label="calculate the result">
			=
		</button>
		<button class="calculator-panel__key calculator-panel__key--number" data-key="number">7</button>
		<button class="calculator-panel__key calculator-panel__key--number" data-key="number">8</button>
		<button class="calculator-panel__key calculator-panel__key--number" data-key="number">9</button>
		<button class="calculator-panel__key calculator-panel__key--number" data-key="number">4</button>
		<button class="calculator-panel__key calculator-panel__key--number" data-key="number">5</button>
		<button class="calculator-panel__key calculator-panel__key--number" data-key="number">6</button>
		<button class="calculator-panel__key calculator-panel__key--number" data-key="number">1</button>
		<button class="calculator-panel__key calculator-panel__key--number" data-key="number">2</button>
		<button class="calculator-panel__key calculator-panel__key--number" data-key="number">3</button>
		<button class="calculator-panel__key calculator-panel__key--number" data-key="number">0</button>
		<button class="calculator-panel__key calculator-panel__key--number" data-key="number">.</button>
	</div>
</div>`;

  screen.getByRole('textbox').addEventListener('keydown', keydownHandler);
  screen.getByTestId('calculator').addEventListener('pointerdown', (e) => { pointerdownHandler(e, screen.getByRole('textbox')) });
}

describe('Calculator UI tests', () => {
  const pointerdownHandler = jest.fn(originalPointerdownHandler);
  const keydownHandler = jest.fn(originalKeydownHandler);

  const numberKeys = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '.',
  ];
  const invalidKeys = ['a', '#', 'B', ',', '\\', '!', ' '];
  const allCalculatorPad = [
    ...numberKeys,
    'C',
    '+/-',
    '%',
    '/',
    '*',
    '-',
    '+',
    '√',
    '=',
  ];

  beforeAll(() => {
    calculatorUISetup(keydownHandler, pointerdownHandler);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  })

  afterEach(() => {
    screen.getByRole('textbox').value = '';
  });

  test.each(allCalculatorPad)('pressing the %s key starts the pointerdown handler', async (value) => {
    await userEvent.click(screen.getByText(value));
    expect(pointerdownHandler).toHaveBeenCalledTimes(1);
  })

  test('entering any value triggers the keydown handler', async () => {
    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.keyboard('2 r');
    expect(keydownHandler).toHaveBeenCalledTimes(3);
  })

  test.each(numberKeys)('Pressing a valid numeric key %s', async (value) => {
    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.keyboard(value);
    expect(screen.getByRole('textbox')).toHaveDisplayValue(value);
  })

  test.each(invalidKeys)('Pressing an invalid %s key', async (value) => {
    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.keyboard(value);
    expect(screen.getByRole('textbox')).toHaveDisplayValue('');
  });

  test('clicking on the C button sets any value to 0', async () => {
    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.keyboard('2');
    await userEvent.click(screen.getByText('C'));
    expect(screen.getByRole('textbox')).toHaveDisplayValue('0');
  });

  test('clicking on the negation button makes any positive number negative', async () => {
    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.keyboard('5');
    await userEvent.click(screen.getByText('+/-'));
    expect(screen.getByRole('textbox')).toHaveDisplayValue('-5');
    await userEvent.click(screen.getByText('+/-'));
    expect(screen.getByRole('textbox')).toHaveDisplayValue('5');
  });

  test('clicking on the negation button does leaves the value 0 the same', async () => {
    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.keyboard('0');
    await userEvent.click(screen.getByText('+/-'));
    expect(screen.getByRole('textbox')).toHaveDisplayValue('0');
  });

  test('clicking on a percentage игеещт returns 1% of 100% for a given number', async () => {
    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.keyboard('56');
    await userEvent.click(screen.getByText('%'));
    expect(screen.getByRole('textbox')).toHaveDisplayValue('0.56');
  });

  test('clicking on the root button returns the square root of this number', async () => {
    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.keyboard('64');
    await userEvent.click(screen.getByText('√'));
    expect(screen.getByRole('textbox')).toHaveDisplayValue('8');
  });

  test('the sum of two numbers', async () => {
    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.keyboard('5');
    await userEvent.click(screen.getByText('+'));
    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.keyboard('16');
    await userEvent.click(screen.getByText('+/-'));
    await userEvent.click(screen.getByText('='));
    expect(screen.getByRole('textbox')).toHaveDisplayValue('-11');
  });

  test('the difference between two numbers', async () => {
    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.keyboard('55');
    await userEvent.click(screen.getByText('-'));
    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.keyboard('15');
    await userEvent.click(screen.getByText('='));
    expect(screen.getByRole('textbox')).toHaveDisplayValue('40');
  });

  test('multiplication of two numbers', async () => {
    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.keyboard('9');
    await userEvent.click(screen.getByText('*'));
    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.keyboard('8');
    await userEvent.click(screen.getByText('='));
    expect(screen.getByRole('textbox')).toHaveDisplayValue('72');
  });

  test('dividing two numbers', async () => {
    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.keyboard('36');
    await userEvent.click(screen.getByText('/'));
    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.keyboard('2');
    await userEvent.click(screen.getByText('='));
    expect(screen.getByRole('textbox')).toHaveDisplayValue('18');
  });

  test('division by zero', async () => {
    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.keyboard('99');
    await userEvent.click(screen.getByText('/'));
    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.keyboard('0');
    await userEvent.click(screen.getByText('='));
    expect(screen.getByRole('textbox')).toHaveDisplayValue(/division by 0 error/i);
  });
})
