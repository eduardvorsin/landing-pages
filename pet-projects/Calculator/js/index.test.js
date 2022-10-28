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
