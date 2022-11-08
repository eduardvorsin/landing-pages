import { Stepper } from "../Stepper";

describe('Stepper constructor tests', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('an invalid dom element was passed to the constructor', () => {
    const stepperInit = () => new Stepper(null);
    expect(stepperInit).toThrowError('An element with such a selector(null) was not found');
  });

  test('input element not found', () => {
    const stepper = document.createElement('div');
    stepper.classList.add('stepper');
    document.body.append(stepper);

    const stepperInit = () => new Stepper('.stepper');
    expect(stepperInit).toThrowError('The input field for the stepper was not found');
  });

  test('increase button not found', () => {
    document.body.innerHTML =
      `<div class="stepper">
    <input class="stepper__input" role="spinbutton" id="stepper" type="text" inputmode="numeric"
    data-stepper-step="0.33" data-stepper-min="10" data-stepper-max="100" placeholder="number" pattern="\d"
    autocomplete="off">
    </div>`;

    const stepperInit = () => new Stepper('.stepper');
    expect(stepperInit).toThrowError('button with date attribute [data-stepper-increase] not found');
  });

  test('decrease button not found', () => {
    document.body.innerHTML =
      `<div class="stepper">
    <input class="stepper__input" role="spinbutton" id="stepper" type="text" inputmode="numeric"
    data-stepper-step="0.33" data-stepper-min="10" data-stepper-max="100" placeholder="number" pattern="\d"
    autocomplete="off">
    <button class="stepper__btn stepper__increase" data-stepper-increase>
      increase
    </button>
    </div>`;

    const stepperInit = () => new Stepper('.stepper');
    expect(stepperInit).toThrowError('button with date attribute [data-stepper-decrease] not found');
  });

  test('invalid minimum value passed for the stepper', () => {
    stepperUISetup({ min: 'a' });

    const stepperInit = () => new Stepper('.stepper');
    expect(stepperInit).toThrowError('invalid minimum value for the stepper');
  });

  test('invalid maximum value passed for the stepper', () => {
    stepperUISetup({ min: '1', max: 'b' });

    const stepperInit = () => new Stepper('.stepper');
    expect(stepperInit).toThrowError('invalid maximum value for the stepper');
  });

  test('the passed minimum is greater than the maximum', () => {
    stepperUISetup({ min: '10', max: '1' });

    const stepperInit = () => new Stepper('.stepper');
    expect(stepperInit).toThrowError('The minimum cannot be greater than the maximum');
  });
});
describe('Stepper increase method tests', () => {
  test('the current value has increased by 1', () => {
    stepperUISetup();

    const stepper = new Stepper('.stepper');
    stepper.increase();
    expect(stepper._input).toHaveDisplayValue(2);
  });

  test('when the current value is equal to the maximum, the increase has no effect', () => {
    stepperUISetup({ min: 3, max: 3, step: 1, });

    const stepper = new Stepper('.stepper');
    stepper.increase();
    expect(stepper._input).toHaveDisplayValue(3);
  });
});
function stepperUISetup(options = {
  step: 1,
  min: 1,
  max: 10,
  value: 2,
}) {
  const { step = 1, min = 1, max = 10, value = 2 } = options;

  document.body.innerHTML =
    `<div class="stepper">
    <label class="visually-hidden stepper__label" for="stepper">Spinbuttton</label>
    <button class="stepper__btn stepper__decrease" data-stepper-decrease>
      decrease
    </button>
    <input class="stepper__input" role="spinbutton" id="stepper" type="text" inputmode="numeric"
    data-stepper-step="${step}" data-stepper-min="${min}" data-stepper-max="${max}" value="${value}" placeholder="number" pattern="\d"
    autocomplete="off">
    <button class="stepper__btn stepper__increase" data-stepper-increase>
      increase
    </button>
  </div>`;
}
