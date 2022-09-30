import { debounce } from "./debounce.js";
import { validationReducer } from "./validation/validationReducer.js";
import { validateForm } from "./validation/validators.js";

const signUpForm = document.querySelector('#sign-up-form');
signUpForm.noValidate = true;

const isInputField = ({ type }) => {
  const inputTypes = ['text', 'password', 'email', 'url'];
  return inputTypes.includes(type);
}

const debouncedValidationReducer = debounce(validationReducer, 500);

signUpForm.addEventListener('input', (e) => {
  if (isInputField(e.target)) {
    const { valueMissing } = e.target.validity;
    e.target.classList.toggle('no-empty', !valueMissing);
  }

  debouncedValidationReducer(e.target);
})

signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const isFormValid = validateForm(e.target);

  if (isFormValid) {
    e.currentTarget.submit();
  }
});

function changePasswordVisibillity(passwordInput) {
  if (passwordInput.type !== 'text' && passwordInput.type !== 'password') return;
  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
}

document.addEventListener('click', (e) => {
  if (!e.target.classList.contains('form-field-wrapper__show-password')) return;

  const passwordInput = e.target.parentElement.querySelector('input');
  const passwordAriaDescription = e.target.parentElement.querySelector('.form-field-wrapper__description');

  e.preventDefault();
  changePasswordVisibillity(passwordInput);

  const isTextType = passwordInput.type === 'text';
  const descriptionText = isTextType ? 'Password is shown' : 'Password is hidden';
  const buttonText = isTextType ? 'Hide password' : 'Show password';

  e.target.classList.toggle('_active', isTextType);
  passwordAriaDescription.textContent = descriptionText;
  e.target.textContent = buttonText;
})