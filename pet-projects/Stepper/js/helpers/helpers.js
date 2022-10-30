export function isValueEmptyString(value) {
  return typeof value === 'string' && value.trim() === '';
}
