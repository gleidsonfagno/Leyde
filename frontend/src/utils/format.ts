export function formatPrice(value: number) {
  return value.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
}
