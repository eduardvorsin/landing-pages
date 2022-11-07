function stepperUISetup(options = {
  step: 1,
  min: 1,
  max: 10,
}) {
  const { step, min, max } = options;

  document.body.innerHTML =
    `<div class="stepper">
    <label class="visually-hidden stepper__label" for="stepper">Spinbuttton</label>
    <button class="stepper__btn stepper__decrease" data-stepper-decrease>
      decrease
    </button>
    <input class="stepper__input" role="spinbutton" id="stepper" type="text" inputmode="numeric"
    data-stepper-step="${step}" data-stepper-min="${min}" data-stepper-max="${max}" placeholder="number" pattern="\d"
    autocomplete="off">
    <button class="stepper__btn stepper__increase" data-stepper-increase>
      increase
    </button>
  </div>`;
}
