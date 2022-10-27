'use strict';
import { keydownHandler, pointerdownHandler } from "./handlers/handlers.js";

const calculator = document.querySelector('#calculator');
const calculatorInput = calculator.querySelector('.calculator__input');

calculatorInput.addEventListener('keydown', keydownHandler);
calculator.addEventListener('pointerdown', (e) => {
  pointerdownHandler(e, calculatorInput);
});
