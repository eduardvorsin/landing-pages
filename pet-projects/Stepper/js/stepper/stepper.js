'use strict';
import { convertToPrecision, isValidKey, isValidNumber, isValueEmptyString } from "../helpers/helpers.js";

export class Stepper {
  constructor(selector) {
    this._container = document.querySelector(selector);

    if (this._container === null) {
      throw new Error(`An element with such a selector(${selector}) was not found`);
    }

    this._input = this._container.querySelector('input');

    if (this._input === null) {
      throw new Error('The input field for the stepper was not found');
    }

    this._increaseBtn = this._container.querySelector('[data-stepper-increase]');

    if (this._increaseBtn === null) {
      throw new Error('button with date attribute [data-stepper-increase] not found');
    }

    this._decreaseBtn = this._container.querySelector('[data-stepper-decrease]');

    if (this._decreaseBtn === null) {
      throw new Error('button with date attribute [data-stepper-decrease] not found');
    }

    const hasSpecifiedStep = 'stepperStep' in this._input.dataset;
    this._step = hasSpecifiedStep ? +this._input.dataset.stepperStep.trim() : 1;

    const hasSpecifiedMinimum = 'stepperMin' in this._input.dataset;

    if (hasSpecifiedMinimum) {
      this._min = +this._input.dataset.stepperMin;
      this._input.ariaValueMin = this._min;
    }

    if (hasSpecifiedMinimum && !isValidNumber(this._min)) {
      throw new Error('invalid minimum value for the stepper');
    }

    const hasSpecifiedMaximum = 'stepperMax' in this._input.dataset;

    if (hasSpecifiedMaximum) {
      this._max = +this._input.dataset.stepperMax;
      this._input.ariaValueMax = this._max;
    }

    if (hasSpecifiedMaximum && !isValidNumber(this._max)) {
      throw new Error('invalid maximum value for the stepper');
    }

    if (this.min > this.max) {
      throw new Error('The minimum cannot be greater than the maximum');
    }

    //! проверить работает ли
    if (!Number.isInteger(this.step)) {
      this._numberPrecision = this.step.toString().split('.')[1].length;
    }

    //! проверить работает ли
    if (this._input.readOnly) {
      this._increaseBtn.disabled = true;
      this._decreaseBtn.disabled = true;
      return;
    }

    this.setValue(hasSpecifiedMinimum ? this._min : 0);
    this.#addEvents();
  }

  //! попробовать как то отрефакторить этот метод
  increase() {
    let inputValue = +this._input.value;
    let nextValue = inputValue + this.step;

    if (this.max && inputValue >= this.max) {
      nextValue = this.max;
    }

    if (inputValue < this.min) {
      nextValue = this.min;
    }

    const finalValue = Number.isInteger(nextValue) ? nextValue : convertToPrecision(nextValue, this._numberPrecision);

    this._input.value = finalValue;
    this._input.ariaValueNow = finalValue;
  }

  //! попробовать как то отрефакторить этот метод
  decrease() {
    let inputValue = +this._input.value;
    let nextValue = inputValue - this.step;

    if (this.min && inputValue <= this.min) {
      nextValue = this.min;
    }

    if (inputValue > this.max) {
      nextValue = this.max;
    }

    const finalValue = Number.isInteger(nextValue) ? nextValue : convertToPrecision(nextValue, this._numberPrecision);

    this._input.value = finalValue;
    this._input.ariaValueNow = finalValue;
  }

  setValue(value) {

    if (!isValidNumber(value)) {
      throw new Error('The value must be a numeric type');
    }

    if (value < this.min || value > this.max) {
      throw new Error('The passed value cannot be less then the minimum or greater than the maximum');
    }

    this._input.value = value;
    this._input.ariaValueNow = value;
  }

  #addEvents() {
    document.addEventListener('keydown', (e) => {
      if (!(e.target === this._input)) return;

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
          if (this.min) this.setValue(this.min);
          break;
        case 'End':
          if (this.max) this.setValue(this.max);
          break;
      }
    });

    document.addEventListener('click', (e) => {
      if (e.target === this._increaseBtn) {
        if (this.#isNextValueLessMaximum(this._input.value)) {
          this.increase();
        }
      }

      if (e.target === this._decreaseBtn) {
        if (this.#isNextValueMoreMinimum(this._input.value)) {
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
      this._input.removeAttribute('data-stepper-min');
      this._input.removeAttribute('aria-valuemin');
      delete this._min;
      return;
    }

    this._min = value;
    this._input.dataset.stepperMin = value;
    this._input.ariaValueMin = value;
    this._input.value = Math.max(this._input.value, value);
    this._input.ariaValueNow = Math.max(this._input.value, value);
  }

  get max() {
    return this._max;
  }

  set max(value) {
    if (!isValidNumber(value)) {
      throw new Error('invalid maximum value for the stepper');
    }

    if (isValueEmptyString(value)) {
      this._input.removeAttribute('data-stepper-max');
      this._input.removeAttribute('aria-valuemax');
      delete this._max;
      return;
    }

    this._max = value;
    this._input.dataset.stepperMax = value;
    this._input.ariaValueMax = value;
    this._input.value = Math.min(this._input.value, value);
    this._input.ariaValueNow = Math.min(this._input.value, value);
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
    this._input.dataset.stepperStep = nextValue;
    this._input.ariaValueNow = nextValue;
  }

  #isNextValueLessMaximum(value) {
    if (!this.max) return true;

    let nextValue = Number(value) + this.step;
    return nextValue <= this.max;
  }

  #isNextValueMoreMinimum(value) {
    if (!this.min) return true;

    let nextValue = Number(value) - this.step;
    return nextValue >= this.min;
  }
}
