'use strict';
import { convertToPrecision, isValidKey } from "./helpers/helpers";

let operations = [];

function evaluate() {
  while (operations.length > 2) {
    let firstOperand = operations.shift();
    let currentOperation = operations.shift();
    let secondOperand = operations.shift();
    let precision = firstOperand.length > secondOperand.length ?
      firstOperand.length : secondOperand.length;
    let result = 0;

    switch (currentOperation) {
      case '+':
        result = +firstOperand + +secondOperand;
        break;
      case '-':
        result = +firstOperand - +secondOperand;
        break;
      case '*':
        result = +firstOperand * +secondOperand;
        break;
      case '/':
        if (secondOperand === '0') {
          calculatorInput.value = 'division by 0 error';
          return;
        }

        result = +firstOperand / +secondOperand;
        break;
    }

    calculatorInput.value = convertToPrecision(result, precision);
    operations.unshift(result);
  }

  operations.length = 0;
}

export function updateInput(value, input) {
  if (!input || input.tagName !== 'INPUT') return;

  if (value === '.' && input.value.includes('.')) {
    return;
  }

  if (input.value === '0') {
    input.value = value;
    return;
  }

  input.value += value;
}

export function makeOperation(value, input) {
  if (Number.isNaN(+input.value) && value !== 'clear') {
    return;
  }

  switch (value) {
    case 'clear':
      input.value = 0;
      operations.length = 0;
      break;
    case 'negation':
      input.value *= -1;
      break;
    case '+':
      operations.push(`${input.value}`, '+');
      input.value = '';
      break;
    case '-':
      operations.push(`${input.value}`, '-');
      input.value = '';
      break;
    case '/':
      operations.push(`${input.value}`, '/');
      input.value = '';
      break;
    case '*':
      operations.push(`${input.value}`, '*');
      input.value = '';
      break;
    case '%':
      input.value /= 100;
      break;
    case 'sqrt':
      input.value = Math.sqrt(input.value);
      break;
    case '=':
      operations.push(`${input.value}`);
      evaluate(input);
      break;
  }
}
