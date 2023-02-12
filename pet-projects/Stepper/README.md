# 🧮 Плагин степпера
[Cсылка на демо](https://eduardvorsin.github.io/landing-pages/pet-projects/Stepper/index.html)

![степпер](./images/stepper.jpg)

## Технологии которые использовались
![html](https://img.shields.io/badge/HTML-%23F06529.svg?style=for-the-badge&logo=html5&logoColor=white)
![css](https://img.shields.io/badge/CSS-%232965F1.svg?style=for-the-badge&logo=css3&logoColor=white)
![javascript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![jest](https://img.shields.io/badge/jest-%2399425B.svg?style=for-the-badge&logo=jest&logoColor=%white)
![testing library](https://img.shields.io/badge/testing_library-%23E33332.svg?style=for-the-badge&logo=testing-library&logoColor=white)

## 📰 Разметка
```html
  <div class="stepper" role="spinbutton">
    <label class="visually-hidden stepper__label" for="stepper">Spinbuttton</label>
    <button class="stepper__btn stepper__decrease" data-stepper-decrease>
      decrease
    </button>
    <input class="stepper__input" id="stepper" type="text" inputmode="numeric" data-stepper-step="0.33"
      data-stepper-min="10" data-stepper-max="100" placeholder="number" pattern="\d" autocomplete="off">
    <button class="stepper__btn stepper__increase" data-stepper-increase>
      increase
    </button>
  </div>
```

### Необходимые `Data-атрибуты`

- `data-stepper-step` -  хранит в себе значение шага для степпера
- `data-stepper-min` - значение минимума для степпера
- `data-stepper-max` - значение максимума для степпера
- `data-stepper-increase` - кнопка для увеличения значения степпера
- `data-stepper-decrease` - кнопка для уменьшения значения степпера

## 🎀 Стили
```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  border: 0;
  clip: rect(0 0 0 0);
}

.stepper {
  display: grid;
  grid-template-columns: 40px 100px 40px;
  grid-template-rows: 40px;
}

.stepper__input,
.stepper__increase,
.stepper__decrease {
  background-color: transparent;
  border: 2px solid hsl(204, 16%, 60%);
}

.stepper__input {
  text-align: center;
  font-size: 26px;
  transition: border-color 0.3s ease;
}

.stepper__input::placeholder {
  font-size: 0;
}

.stepper__btn {
  position: relative;
  font-size: 0;
  background-color: hsl(204, 16%, 60%);
  cursor: pointer;
  padding: 2px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.stepper__input[read-only],
.stepper__btn {
  opacity: 0.7;
}

.stepper__btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: 30px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}

.stepper__increase::before {
  background-image: url(../images/icons/plus.svg);
}

.stepper__decrease::before {
  background-image: url(../images/icons/minus.svg);
}

.stepper__btn:hover {
  background-color: hsl(204, 16%, 70%);
  border-color: hsl(204, 16%, 70%);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.stepper__btn:active {
  background-color: hsl(204, 16%, 80%);
  border-color: hsl(204, 16%, 80%);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.stepper__input:hover {
  border-color: hsl(204, 16%, 70%);
  transition: border-color 0.3s ease;
}

```
Просто презентационные стили, ваши стили могут быть совершенно другими.

## ⚙️ Cкрипты

### Stepper.js
```javascript
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

    if (!Number.isInteger(this.step)) {
      this._numberPrecision = this.step.toString().split('.')[1].length;
    }

    if (this._input.readOnly) {
      this._increaseBtn.disabled = true;
      this._decreaseBtn.disabled = true;
      return;
    }

    let initialValue = null;

    if (this._input.value === '' && hasSpecifiedMinimum) {
      initialValue = this._min;
    } else if (this._input.value !== '') {
      initialValue = this._input.value;
    } else {
      initialValue = 0;
    }

    this.setValue(initialValue);
    this.#addEvents();
  }

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

      if (!isValidKey(e.key) || (e.key === '-' && this._input.value.includes('-'))) {
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
      if (e.target === this._increaseBtn && this.#isNextValueLessMaximum(this._input.value)) {
        this.increase();
      }

      if (e.target === this._decreaseBtn && this.#isNextValueMoreMinimum(this._input.value)) {
        this.decrease();
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

    let nextValue = +value + this.step;
    return nextValue <= this.max;
  }

  #isNextValueMoreMinimum(value) {
    if (!this.min) return true;

    let nextValue = +value - this.step;
    return nextValue >= this.min;
  }
}

```
Кратко о методах класса:

- `increase()` - увеличивает значение степпера на значение шага
- `decrease()` - уменьшает значение степпера на значение шага
- `setValue(value)` - устанавливает переданное значение степперу
- `#addEvents()` - добавляет события ввода, клика, нажатия клавиш
- `get min()` - геттер для получения минимального значения степпера
- `set min()` - сеттер для установки нового минимального значения степпера
- `get max()` - геттер для получения максимального значения степпера
- `set max()` - сеттер для установки нового максимального значения степпера
- `get step()` - геттер для получения значения шага
- `set step()` - сеттер для установки нового значения шага
- `#isNextValueLessMaximum(value)` - возвращает true, если число(`value + step`) меньше максимума
- `#isNextValueMoreMinimum(value)` - возвращает true, если число(`value - step`) максимума

Кратко о свойствах класса:

- `this._stepperContainer` - контейнер для степпера
- `this._stepperInput` - поле ввода степпера
- `this._stepperIncreaseBtn` - кнопка увеличения значения
- `this._stepperDecreaseBtn` - кнопка уменьшения значения
- `this._min` - минимальное значение внутри степпера
- `this._max` - максимальное значение внутри степпера
- `this._numberPrecision` - количество чисел после запятой, если шаг является дробным числом

### helpers.js
```javascript

export function isValueEmptyString(value) {
  return typeof value === 'string' && value.trim() === '';
}

export function isValidKey(value) {
  let validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Delete', 'Backspace', 'Home', 'End', 'Tab', '-'];

  return validKeys.includes(value);
}

export function isValidNumber(value) {
  return !Number.isNaN(+value);
}

export function convertToPrecision(num, precision) {
  return Math.round(num * 10 ** precision) / 10 ** precision;
}
```
Кратко о хелпер функциях:

- `isValueEmptyString(value)` - возвращает true если переданное значение пустая строка
- `isValidKey(value)` - возвращает boolean значение при нажатии клавиш, если валидная клавиша - true, иначе false
- `isValidNumber(value)` - проверяет принимаемое значение на то является ли оно валидным числом
- `convertToPrecision(num, precision)` - преобразует вещественное число до необходимой точности

### Инициализация экземпляра степпера
```javascript
'use strict';
import { Stepper } from "./stepper/Stepper.js";

const stepper = new Stepper('.stepper');
```
## ✨Особенности плагина:
- Функционал приближенный к нативному степперу, но с возможностью кастомной стилизации
- При добавлении к инпуту атрибута readonly, делает степпер только для чтения
