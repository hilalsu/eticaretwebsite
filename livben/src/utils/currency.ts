export type Currency = 'TRY' | 'EUR' | 'USD';

export function formatCurrency(amount: number, currency: Currency) {
  const locales = {
    TRY: 'tr-TR',
    EUR: 'de-DE',
    USD: 'en-US',
  };
  return amount.toLocaleString(locales[currency], {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  });
} 