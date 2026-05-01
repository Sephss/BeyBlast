// Generate a random ID
export function genId(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// Debounce
export function debounce(fn, delay = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

// Truncate text
export function truncate(str, len = 80) {
  if (!str) return "";
  return str.length > len ? str.slice(0, len) + "…" : str;
}

// Parse query params
export function getParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

// Validate non-empty
export function required(value, label = "Field") {
  if (!value || !value.toString().trim()) {
    throw new Error(`${label} is required.`);
  }
  return value.toString().trim();
}

// Check date is in the future or today
export function isFutureOrToday(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return d >= now;
}
export function formatDate(date) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
