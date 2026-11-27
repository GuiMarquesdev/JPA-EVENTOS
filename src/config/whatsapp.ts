export const OWNER_WHATSAPP_DIGITS = '5571999990000'; // DDI + DDD + número (apenas dígitos)

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${OWNER_WHATSAPP_DIGITS}?text=${encodeURIComponent(message)}`;
}

export function openWhatsAppWithMessage(message: string): void {
  const link = document.createElement('a');
  link.href = buildWhatsAppUrl(message);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  try {
    link.click();
  } finally {
    document.body.removeChild(link);
  }
}
