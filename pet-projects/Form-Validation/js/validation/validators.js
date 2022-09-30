import { hideError, showError } from "./validationErrors.js";

export const validationRules = {
	username: validateUsername,
	email: validateEmail,
	password: validatePassword,
	confirmPassword: validateConfirmPassword,
	privacyPolicy: validatePrivacyPolicy,
	communicationMethod: validateCommunicationMethod,
};

export function validateUsername(input) {
	hideError(input);

	const usernameRules = {
		isRequiredAndValueMissing: {
			message: 'The field is required',
			validationFunction: isRequiredAndValueMissing,
		},

		longerOrEqualThan3: {
			message: 'the minimum count of char is 3',
			validationFunction: longerOrEqualThan3,
		},
	}

	const isValid = validateRulesForInput(usernameRules, input);

	return isValid;
}

export function validateEmail(input) {
	hideError(input);

	const emailRules = {
		isRequiredAndValueMissing: {
			message: 'The field is required',
			validationFunction: isRequiredAndValueMissing,
		},

		isEmail: {
			message: 'the field input should contains following pattern: example@email.com',
			validationFunction: isEmail,
		},
	}

	const isValid = validateRulesForInput(emailRules, input);

	return isValid;
}

export function validatePassword(input) {
	hideError(input);

	const passwordRules = {
		isRequiredAndValueMissing: {
			message: 'The field is required',
			validationFunction: isRequiredAndValueMissing,
		},

		longerOrEqualThan5: {
			message: 'the minimum count of char is 5',
			validationFunction: longerOrEqualThan5,
		},

		hasOneOrMoreDigits: {
			message: 'the field input should has one or more digits',
			validationFunction: hasOneOrMoreDigits,
		},

		hasOneOrMoreSpecialCharacters: {
			message: 'the field input should has one or more following characters:!@#$%^&*',
			validationFunction: hasOneOrMoreSpecialCharacters,
		},

		hasOneOrMoreLowercaseCharachers: {
			message: 'the field input should has one or more lowercase characters',
			validationFunction: hasOneOrMoreLowercaseCharachers,
		},

		hasOneOrMoreUppercaseCharachers: {
			message: 'the field input should has one or more uppercase characters',
			validationFunction: hasOneOrMoreUppercaseCharachers,
		},
	}

	const isValid = validateRulesForInput(passwordRules, input);

	return isValid;
}

export function validateConfirmPassword(input) {
	hideError(input);

	const passwordValue = input.form.password.value;
	const { value: confirmValue } = input;
	let isValid = true;

	if (isRequiredAndValueMissing(input)) {
		showError(input, 'The field is required');
		isValid = false;
	}

	if (!isPasswordsMatch(passwordValue, confirmValue)) {
		showError(input, 'confirm password does not match');
		isValid = false;
	}

	if (!isValid) {
		input.focus();
		input.classList.add('focus-visible');
	}

	input.classList.toggle('is-invalid', !isValid);
	input.ariaInvalid = !isValid;

	return isValid;
}

export function validatePrivacyPolicy(input) {
	hideError(input);
	const isValid = !isRequiredAndValueMissing(input);

	if (!isValid) {
		showError(input, 'The field is required');
		input.focus();
		input.classList.add('focus-visible');
	}

	input.classList.toggle('is-invalid', !isValid);
	input.ariaInvalid = !isValid;

	return isValid;
}

export function validateCommunicationMethod(input) {
	hideError(input);
	let radios;

	if (input.length !== undefined) {
		radios = [...input];
	} else {
		radios = [...input.closest('.form__item').elements];
	}

	const isValid = radios.some((radio) => radio.checked);

	if (!isValid) {
		showError(input, 'The field must be checked');
		radios[0].focus();
		radios[0].classList.add('focus-visible');
	}

	radios.forEach(radio => {
		radio.classList.toggle('is-invalid', !isValid);
		radio.ariaInvalid = !isValid;
	})

	return isValid;
}

export function validateForm(form) {
	let isValid = true;

	for (let [field, validationFunction] of Object.entries(validationRules)) {
		if (!validationFunction(form.elements[field])) isValid = false;
	}

	return isValid;
}

export function validateRulesForInput(rules, input) {
	const { value } = input;
	let isValid = true;

	for (let rule in rules) {
		let args;
		let isRuleInvalidated;

		if (rule === 'isRequiredAndValueMissing') {
			args = input;
			isRuleInvalidated = rules[rule].validationFunction(args);
		} else {
			args = value;
			isRuleInvalidated = !rules[rule].validationFunction(args);
		}

		if (isRuleInvalidated) {
			showError(input, rules[rule].message);
			input.focus();
			input.classList.add('focus-visible');
			isValid = false;
		}
	}

	input.classList.toggle('is-invalid', !isValid);
	input.ariaInvalid = !isValid;

	return isValid;
}

export const isRequiredAndValueMissing = (input) => input.required && input.validity.valueMissing;
export const isEmail = (value) => value.search(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/) >= 0;
export const longerOrEqualThan3 = (value) => value.length >= 3;
export const longerOrEqualThan5 = (value) => value.length >= 5;
export const hasOneOrMoreDigits = (value) => value.search(/\d+/) >= 0;
export const hasOneOrMoreSpecialCharacters = (value) => value.search(/[!@#$%^&*]+/) >= 0;
export const hasOneOrMoreLowercaseCharachers = (value) => value.search(/[a-z]+/) >= 0;
export const hasOneOrMoreUppercaseCharachers = (value) => value.search(/[A-Z]+/) >= 0;
export const isPasswordsMatch = (passwordValue, confirmPasswordValue) => passwordValue === confirmPasswordValue;

