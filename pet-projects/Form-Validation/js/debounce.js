export function debounce(fn, ms) {
	let timeout;

	return (...args) => {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => fn.apply(this, args), ms);
	};
}