'use strict';

const calculator = document.querySelector('#calculator');
const calculatorInput = calculator.querySelector('.calculator__input');

let operations = [];

function convertToPrecision(num, precision) {
  return Math.round(num * 10 ** precision) / 10 ** precision;
}

function isNotNumber(value) {
  return Number.isNaN(+value);
}

function isValidKey(value) {
  let validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Delete', 'Backspace', 'Home', 'End', 'Tab'];

  return validKeys.includes(value);
}


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


calculatorInput.addEventListener('keydown', (e) => {
  if (!isValidKey(e.key)) {
    e.preventDefault();
    return false;
  }

})

calculator.addEventListener('pointerdown', (e) => {
  if (e.target.dataset.key === 'number') {
    updateInput(e.target.textContent);
  }

  if (e.target.dataset.key === 'operation') {
    makeOperation(e.target.dataset.operation);
  }

});


function updateInput(value) {
  if (value === '.' && calculatorInput.value.includes('.')) {
    return;
  }

  if (calculatorInput.value === '0') {
    calculatorInput.value = value;
    return;
  }

  calculatorInput.value += value;
}

function makeOperation(value) {
  if (isNotNumber(calculatorInput.value) && value !== 'clear') {
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
