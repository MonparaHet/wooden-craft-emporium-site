
export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}

export function truncateText(text, length = 100) {
  if (!text) return '';
  return text.length > length ? `${text.substring(0, length)}...` : text;
}

export function generateOrderId() {
  const timestamp = new Date().getTime().toString().slice(-6);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `BS-${timestamp}${random}`;
}

export function calculateTotal(items = []) {
  return items.reduce((total, item) => total + (parseFloat(item.price.replace(/[^\d.-]/g, '')) * item.quantity), 0);
}
