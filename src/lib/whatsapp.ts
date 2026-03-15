export function buildWhatsAppURL(
  message: string,
  number: string
): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
