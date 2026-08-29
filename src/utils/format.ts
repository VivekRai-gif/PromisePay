/**
 * Formats native MON balance to exactly 4 decimal places without precision loss.
 * Examples:
 *   49.089      -> "49.0890"
 *   50          -> "50.0000"
 *   49.08912345 -> "49.0891"
 */
export function formatMonBalance(value: string | number | bigint | undefined | null): string {
  if (value === undefined || value === null) return '0.0000';
  
  const str = value.toString().trim();
  if (!str || str === 'NaN') return '0.0000';

  const parts = str.split('.');
  const integerPart = parts[0] || '0';
  let decimalPart = parts[1] || '';

  if (decimalPart.length < 4) {
    decimalPart = decimalPart.padEnd(4, '0');
  } else {
    decimalPart = decimalPart.substring(0, 4);
  }

  return `${integerPart}.${decimalPart}`;
}
