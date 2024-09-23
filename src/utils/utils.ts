export function toString(value: boolean|string|File|null|number|undefined): string {
  if (value === true) {
    return 'on';
  }
  if (!value && value !== 0) {
    return '';
  }
  if (value instanceof File) {
    return value.name;
  }
  return String(value);
}
