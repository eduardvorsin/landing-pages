import { validateCommunicationMethod, validateConfirmPassword, validateEmail, validatePassword, validatePrivacyPolicy, validateUsername } from "./validators.js";

const USERNAME = 'username';
const EMAIL = 'email';
const PASSWORD = 'password';
const CONFIRM_PASSWORD = 'confirmPassword';
const PRIVACY_POLICY = 'privacyPolicy';
const COMMUNICATION_METHOD = 'communicationMethod';

export function validationReducer(input) {
	switch (input.name) {
		case USERNAME:
			return validateUsername(input);
		case EMAIL:
			return validateEmail(input);
		case PASSWORD:
			return validatePassword(input);
		case CONFIRM_PASSWORD:
			return validateConfirmPassword(input);
		case PRIVACY_POLICY:
			return validatePrivacyPolicy(input);
		case COMMUNICATION_METHOD:
			return validateCommunicationMethod(input);
		default:
	}
}