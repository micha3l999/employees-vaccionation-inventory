export function validateEmail(value) {
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (value.match(validRegex)) {
    return true;
  }
  return false;
}

export function validateIdentification(value) {
  const validRegex = /^[0-9]{10}$/;
  if (value.match(validRegex)) {
    return true;
  }
  return false;
}
