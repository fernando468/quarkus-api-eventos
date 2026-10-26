export function formatLocalDateTime(date: string): string {
  return date?.substring(0, 16);
}

export function isValidLocalDateTime(value: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d{1,9})?)?$/;

  if (!value) {
    return false;
  }

  if (regex.test(value)) {
    return true;
  }

  return false;
}
