export function normalize (text: string) {
  return text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function has (text: string, _has: string) {
  return normalize(text).includes(normalize(_has));
}

export function capitalize (text: string) {
  return `${text.charAt(0).toUpperCase()}${text.substr(1).toLowerCase()}`;
}
