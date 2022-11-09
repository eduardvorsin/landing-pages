import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
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
    expect(stepper._input).toHaveDisplayValue(3);
  });

  test('when the current value is equal to the maximum, the increase has no effect', () => {
    stepperUISetup({ max: 3, value: 3 });

    const stepper = new Stepper('.stepper');
    stepper.increase();
    expect(stepper._input).toHaveDisplayValue(3);
  });

  test('when the input value is less than the minimum', async () => {
    stepperUISetup();

    const stepper = new Stepper('.stepper');
    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.keyboard('{BackSpace}-5');

    stepper.increase();
    expect(screen.getByRole('textbox')).toHaveDisplayValue(1);
  });
});

describe('Stepper decrease method tests', () => {
  test('the current value has decreased by 1', () => {
    stepperUISetup();

    const stepper = new Stepper('.stepper');
    stepper.decrease();
    expect(stepper._input).toHaveDisplayValue(1);
  });

  test('when the current value is equal to the minimum, the decrease has no effect', () => {
    stepperUISetup({ min: -1, value: -1 });

    const stepper = new Stepper('.stepper');
    stepper.decrease();
    expect(stepper._input).toHaveDisplayValue(-1);
  });

  test('when the input value is greater than the maximum', async () => {
    stepperUISetup();

    const stepper = new Stepper('.stepper');
    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.keyboard('{BackSpace}150');

    stepper.decrease();
    expect(stepper._input).toHaveDisplayValue(10);
  });
});

describe('Stepper setValue method tests', () => {
  test('invalid value passed', () => {
    stepperUISetup();

    const stepper = new Stepper('.stepper');
    expect(() => stepper.setValue('abc')).toThrowError('The value must be a numeric type');
  });

  test('the passed value is less than the minimum', () => {
    stepperUISetup();

    const stepper = new Stepper('.stepper');
    expect(() => stepper.setValue('-5')).toThrowError('The passed value cannot be less then the minimum or greater than the maximum');
  });

  test('the passed value is greater than the maximum', () => {
    stepperUISetup({ max: 10 });

    const stepper = new Stepper('.stepper');
    expect(() => stepper.setValue('20')).toThrowError('The passed value cannot be less then the minimum or greater than the maximum');
  });

  test('valid value passed', () => {
    stepperUISetup();

    const stepper = new Stepper('.stepper');
    stepper.setValue('5');
    expect(screen.getByRole('textbox')).toHaveDisplayValue('5');
  });

});

describe('Stepper the min setter tests', () => {
  test('invalid value passed', () => {
    stepperUISetup();

    const stepper = new Stepper('.stepper');
    expect(() => {
      stepper.min = 'cba';
    }).toThrowError('invalid minimum value for the stepper');
  });

  test('the passed value is an empty string', () => {
    stepperUISetup();

    const stepper = new Stepper('.stepper');
    stepper.min = '';
    expect(stepper.min).toBeUndefined();
  });

  test('valid value passed', () => {
    stepperUISetup();

    const stepper = new Stepper('.stepper');
    stepper.min = '-15';
    expect(stepper.min).toBe('-15');
  });
});

describe('Stepper the max setter tests', () => {
  test('invalid value passed', () => {
    stepperUISetup();

    const stepper = new Stepper('.stepper');
    expect(() => {
      stepper.min = 'aab';
    }).toThrowError('invalid minimum value for the stepper');
  });

  test('the passed value is an empty string', () => {
    stepperUISetup();

    const stepper = new Stepper('.stepper');
    stepper.max = '';
    expect(stepper.max).toBeUndefined();
  });

  test('valid value passed', () => {
    stepperUISetup();

    const stepper = new Stepper('.stepper');
    stepper.max = '15';
    expect(stepper.max).toBe('15');
  });
});

describe('Stepper the step setter tests', () => {
  test('invalid value passed', () => {
    stepperUISetup();

    const stepper = new Stepper('.stepper');
    expect(() => {
      stepper.step = 'cbba';
    }).toThrowError('invalid value for the step');
  });

  test('the passed value is an empty string', () => {
    stepperUISetup();

    const stepper = new Stepper('.stepper');
    stepper.step = '';
    expect(stepper.step).toBe(1);
  });

  test('valid value passed', () => {
    stepperUISetup();

    const stepper = new Stepper('.stepper');
    stepper.step = '50';
    expect(stepper.step).toBe('50');
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
    `<div class="stepper" role="spinbutton">
    <label class="visually-hidden stepper__label" for="stepper">Spinbuttton</label>
    <button class="stepper__btn stepper__decrease" data-stepper-decrease>
      decrease
    </button>
    <input class="stepper__input" id="stepper" type="text" inputmode="numeric"
    data-stepper-step="${step}" data-stepper-min="${min}" data-stepper-max="${max}" value="${value}" placeholder="number" pattern="\d"
    autocomplete="off">
    <button class="stepper__btn stepper__increase" data-stepper-increase>
      increase
    </button>
  </div>`;
}
