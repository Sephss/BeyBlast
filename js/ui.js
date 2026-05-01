// Toast notifications
export function showToast(message, type = "success", duration = 3500) {
  const existing = document.querySelector(".bb-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = `bb-toast bb-toast--${type}`;
  toast.innerHTML = `
    <span class="bb-toast__icon">${type === "success" ? "✦" : type === "error" ? "✖" : "◈"}</span>
    <span class="bb-toast__msg">${message}</span>
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("bb-toast--show"));
  setTimeout(() => {
    toast.classList.remove("bb-toast--show");
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

// Loading overlay
export function showLoading(msg = "Loading...") {
  let overlay = document.getElementById("bb-loading");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "bb-loading";
    overlay.innerHTML = `<div class="bb-loading__inner"><div class="bb-spinner"></div><p>${msg}</p></div>`;
    document.body.appendChild(overlay);
  }
  overlay.style.display = "flex";
}

export function hideLoading() {
  const overlay = document.getElementById("bb-loading");
  if (overlay) overlay.style.display = "none";
}

// Confirm modal
export function showConfirm(title, message, onConfirm, onCancel) {
  const existing = document.getElementById("bb-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "bb-modal";
  modal.className = "bb-modal";
  modal.innerHTML = `
    <div class="bb-modal__box">
      <h3 class="bb-modal__title">${title}</h3>
      <p class="bb-modal__msg">${message}</p>
      <div class="bb-modal__actions">
        <button class="btn btn--ghost" id="bb-modal-cancel">Cancel</button>
        <button class="btn btn--danger" id="bb-modal-confirm">Confirm</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  requestAnimationFrame(() => modal.classList.add("bb-modal--show"));

  document.getElementById("bb-modal-confirm").onclick = () => {
    modal.remove();
    if (onConfirm) onConfirm();
  };
  document.getElementById("bb-modal-cancel").onclick = () => {
    modal.remove();
    if (onCancel) onCancel();
  };
  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.remove();
      if (onCancel) onCancel();
    }
  };
}

// Avatar placeholder
export function avatarFallback(name = "?") {
  const initial = name.charAt(0).toUpperCase();
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'><rect width='80' height='80' rx='40' fill='%23111'/><text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' fill='%2300f0ff' font-size='32' font-family='sans-serif'>${initial}</text></svg>`)}`;
}

// Format date
export function formatDate(ts) {
  if (!ts) return "—";
  return new Date(ts).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(dateStr, timeStr) {
  if (!dateStr) return "—";
  const d = new Date(`${dateStr}T${timeStr || "00:00"}`);
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Render nav active state
export function setNavActive(page) {
  document.querySelectorAll(".nav__link").forEach((link) => {
    link.classList.toggle("nav__link--active", link.dataset.page === page);
  });
}

// Escape HTML
export function escHtml(str) {
  const d = document.createElement("div");
  d.appendChild(document.createTextNode(str || ""));
  return d.innerHTML;
}
export function truncate(str, length = 100) {
  if (!str) return "";
  return str.length > length ? str.substring(0, length) + "..." : str;
}
