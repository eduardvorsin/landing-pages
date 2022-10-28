'use strict';

import { makeOperation, updateInput } from "../calculator/calculator.js";
import { isValidKey } from "../helpers/helpers.js";

export function keydownHandler(e) {
  if (!isValidKey(e.key) || (e.key === '.' && e.target.value.includes('.'))) {
    e.preventDefault();
    return false;
  }
}

export function pointerdownHandler(e, input) {
  if (e.target.dataset.key === 'number') {
    updateInput(e.target.textContent, input);
  } else if (e.target.dataset.key === 'operation') {
    makeOperation(e.target.dataset.operation, input);
  }
}
