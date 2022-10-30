'use strict';

import { convertToPrecision, isValidKey, isValidNumber, isValueEmptyString } from "../helpers/helpers.js";

export class Stepper {
  constructor(selector) {
    this._stepperContainer = document.querySelector(selector);

    if (this._stepperContainer === null) {
      throw new Error(`An element with such a selector(${selector}) was not found`);
    }

    this._stepperInput = this._stepperContainer.querySelector('input');

    if (this._stepperInput === null) {
      throw new Error('The input field for the stepper was not found');
    }

    this._stepperIncreaseBtn = this._stepperContainer.querySelector('[data-stepper-increase]');

    if (this._stepperIncreaseBtn === null) {
      throw new Error('button with date attribute [data-stepper-increase] not found');
    }

    this._stepperDecreaseBtn = this._stepperContainer.querySelector('[data-stepper-decrease]');

    if (this._stepperDecreaseBtn === null) {
      throw new Error('button with date attribute [data-stepper-decrease] not found');
    }

    this._step = +this._stepperInput.dataset.stepperStep.trim() || 1;

    if ('stepperMin' in this._stepperInput.dataset) {
      this._min = +this._stepperInput.dataset.stepperMin;
      this._stepperInput.ariaValueMin = this._min;
    }

    if (!isValidNumber(this._min)) {
      throw new Error('invalid minimum value for the stepper');
    }

    if ('stepperMax' in this._stepperInput.dataset) {
      this._max = +this._stepperInput.dataset.stepperMax;
      this._stepperInput.ariaValueMax = this._max;
    }

    if (!isValidNumber(this._max)) {
      throw new Error('invalid maximum value for the stepper');
    }

    if (this.min > this.max) {
      throw new Error('The minimum cannot be greater than the maximum');
    }

    if (!Number.isInteger(this.step)) {
      this._numberPrecision = this.step.toString().split('.')[1].length;
    }

    if (this._stepperInput.readOnly) {
      this._stepperIncreaseBtn.disabled = true;
      this._stepperDecreaseBtn.disabled = true;
      return;
    }

    this.setValue(this._min);
    this.#addEvents();
  }

  increase() {
    let inputValue = +this._stepperInput.value;
    let nextValue = null;

    if (this.max !== undefined && inputValue >= this.max) {
      nextValue = this.max;
    }

    if (inputValue < this.min) {
      nextValue = this.min;
    }

    if (nextValue === null) {
      if (Number.isInteger(this.step)) {
        nextValue = inputValue + this.step;
      } else {
        nextValue = convertToPrecision(inputValue + this.step, this._numberPrecision);
      }
    }

    this._stepperInput.value = nextValue;
    this._stepperInput.ariaValueNow = nextValue;
  }

  decrease() {
    let inputValue = +this._stepperInput.value;
    let nextValue = null;

    if (this.min !== undefined && inputValue <= this.min) {
      nextValue = this.min;
    }

    if (inputValue > this.max) {
      nextValue = this.max;
    }

    if (nextValue === null) {
      if (Number.isInteger(this.step)) {
        nextValue = inputValue - this.step;
      } else {
        nextValue = convertToPrecision(inputValue - this.step, this._numberPrecision);
      }
    }

    this._stepperInput.value = nextValue;
    this._stepperInput.ariaValueNow = nextValue;
  }

  setValue(value) {

    if (!isValidNumber(value)) {
      throw new Error('The value must be a numeric type');
    }

    if (value < this.min || value > this.max) {
      throw new Error('The passed value cannot be less then the minimum or greater than the maximum');
    }

    this._stepperInput.value = value;
    this._stepperInput.ariaValueNow = value;
  }

  #addEvents() {
    document.addEventListener('keydown', (e) => {
      if (!(e.target === this._stepperInput)) return;

      if (!isValidKey(e.key)) {
        e.preventDefault();
        return false;
      }

      switch (e.key) {
        case 'ArrowUp':
          if (this.#isNextValueLessMaximum(e.target.value)) {
            this.increase();
          }
          break;
        case 'ArrowDown':
          if (this.#isNextValueMoreMinimum(e.target.value)) {
            this.decrease();
          }
          break;
        case 'Home':
          if (this.min !== undefined) this.setValue(this.min);
          break;
        case 'End':
          if (this.max !== undefined) this.setValue(this.max);
          break;
      }
    });

    document.addEventListener('click', (e) => {
      if (e.target === this._stepperIncreaseBtn) {
        if (this.#isNextValueLessMaximum(this._stepperInput.value)) {
          this.increase();
        }
      }

      if (e.target === this._stepperDecreaseBtn) {
        if (this.#isNextValueMoreMinimum(this._stepperInput.value)) {
          this.decrease();
        }
      }
    });
  }

  get min() {
    return this._min;
  }

  set min(value) {
    if (!isValidNumber(value)) {
      throw new Error('invalid minimum value for the stepper');
    }

    if (isValueEmptyString(value)) {
      this._stepperInput.removeAttribute('data-stepper-min');
      this._stepperInput.removeAttribute('aria-valuemin');
      delete this._min;
      return;
    }

    this._min = value;
    this._stepperInput.dataset.stepperMin = value;
    this._stepperInput.ariaValueMin = value;
    this._stepperInput.value = Math.max(this._stepperInput.value, value);
    this._stepperInput.ariaValueNow = Math.max(this._stepperInput.value, value);
  }

  get max() {
    return this._max;
  }

  set max(value) {
    if (!isValidNumber(value)) {
      throw new Error('invalid maximum value for the stepper');
    }

    if (isValueEmptyString(value)) {
      this._stepperInput.removeAttribute('data-stepper-max');
      this._stepperInput.removeAttribute('aria-valuemax');
      delete this._max;
      return;
    }

    this._max = value;
    this._stepperInput.dataset.stepperMax = value;
    this._stepperInput.ariaValueMax = value;
    this._stepperInput.value = Math.min(this._stepperInput.value, value);
    this._stepperInput.ariaValueNow = Math.min(this._stepperInput.value, value);
  }

  get step() {
    return this._step;
  }

  set step(value) {
    if (!isValidNumber(value)) {
      throw new Error('invalid value for the step');
    }

    let nextValue = isValueEmptyString(value) ? 1 : value;

    this._step = nextValue;
    this._stepperInput.dataset.stepperStep = nextValue;
    this._stepperInput.ariaValueNow = nextValue;
  }

  #isNextValueLessMaximum(value) {
    if (this.max === undefined) return true;

    let nextValue = Number(value) + this.step;
    return nextValue <= this.max;
  }

  #isNextValueMoreMinimum(value) {
    if (this.min === undefined) return true;

    let nextValue = Number(value) - this.step;
    return nextValue >= this.min;
  }
}
