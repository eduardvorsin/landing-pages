export function showError(input, message) {
	const isRadioButton = Boolean(input.length);
	let currentInput = isRadioButton ? input[0] : input;
	let closestCommonParent = currentInput.closest('.form-item');

	const prevMessage = closestCommonParent.querySelector('.error-message');

	if (prevMessage && prevMessage.textContent !== message) {
		prevMessage.textContent = message;
		return;
	}

	const errorMessage = document.createElement('p');
	const errorId = `${currentInput.id}-error`;

	errorMessage.textContent = message;
	errorMessage.classList.add('error-message');
	errorMessage.id = errorId;
	closestCommonParent.append(errorMessage);
	currentInput.setAttribute('aria-describedby', errorId);
}

export function hideError(input) {
	const isRadioButton = Boolean(input.length);

	let currentInput = isRadioButton ? input[0] : input;
	let closestCommonParent = currentInput.closest('.form-item');

	const errorMessage = closestCommonParent.querySelector('.error-message');
	if (errorMessage) {
		errorMessage.remove();
		currentInput.removeAttribute('aria-describedby');
	}
}