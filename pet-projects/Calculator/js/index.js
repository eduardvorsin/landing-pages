'use strict';
import { keydownHandler, pointerdownHandler } from "./handlers/handlers.js";

const calculator = document.querySelector('#calculator');
const calculatorInput = calculator.querySelector('.calculator__input');

calculatorInput.addEventListener('keydown', keydownHandler);
calculator.addEventListener('pointerdown', (e) => {
  if (e.target.tagName === 'BUTTON') playSound();

  pointerdownHandler(e, calculatorInput);
});

const beepSound = new Audio('../../pet-projects/Calculator/audio/beep-sound.mp3');
export const playSound = () => beepSound.play();
