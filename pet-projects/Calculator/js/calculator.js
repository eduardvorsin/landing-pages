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

function makeOperation(value) {
  if (Number.isNaN(+calculatorInput.value) && value !== 'clear') {
    return;
  }

  switch (value) {
    case 'clear':
      calculatorInput.value = 0;
      operations.length = 0;
      break;
    case 'negation':
      calculatorInput.value *= -1;
      break;
    case '+':
      operations.push(`${calculatorInput.value}`, '+');
      calculatorInput.value = '';
      break;
    case '-':
      operations.push(`${calculatorInput.value}`, '-');
      calculatorInput.value = '';
      break;
    case '/':
      operations.push(`${calculatorInput.value}`, '/');
      calculatorInput.value = '';
      break;
    case '*':
      operations.push(`${calculatorInput.value}`, '*');
      calculatorInput.value = '';
      break;
    case '%':
      calculatorInput.value /= 100;
      break;
    case 'sqrt':
      calculatorInput.value = Math.sqrt(calculatorInput.value);
      break;
    case '=':
      operations.push(`${calculatorInput.value}`);
      evaluate();
      break;
  }
}
