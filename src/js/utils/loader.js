const LOADER_ID = 'global-loader-overlay';
let activeCount = 0;
let failSafeTimer = null;
let watchdog = null;

function stripVisibility() {
  const existing = dedupeAndGet();
  if (existing) existing.classList.remove('is-visible');
  activeCount = 0;
  clearFailSafe();
  startWatchdog();
}

function dedupeAndGet() {
  const nodes = document.querySelectorAll(`#${LOADER_ID}`);
  nodes.forEach((node, idx) => {
    if (idx > 0) node.remove();
  });
  return nodes[0] || null;
}

function ensureLoader() {
  let loader = dedupeAndGet();
  if (!loader) {
    loader = document.createElement('div');
    loader.id = LOADER_ID;
    loader.className = 'loader-overlay';
    loader.innerHTML = `
      <div class="loader-spinner" role="status" aria-live="polite" aria-label="Loading">
        <span class="loader-dot"></span>
        <span class="loader-dot"></span>
        <span class="loader-dot"></span>
      </div>
    `;
    document.body.appendChild(loader);
  }
  return loader;
}

export function showLoader() {
  const loader = ensureLoader();
  activeCount += 1;
  clearFailSafe();
  startWatchdog();
  requestAnimationFrame(() => loader.classList.add('is-visible'));
  // Auto-clear after 12s in case a request never resolves
  failSafeTimer = setTimeout(() => {
    resetLoader();
  }, 12000);
}

export function hideLoader() {
  const loader = dedupeAndGet();
  if (!loader) return;
  activeCount = Math.max(0, activeCount - 1);
  if (activeCount === 0) {
    loader.classList.remove('is-visible');
    clearFailSafe();
    startWatchdog();
  }
}

// Defensive: clear any stale visible state on hot-reloads/page restore
export function resetLoader() {
  const loader = dedupeAndGet();
  activeCount = 0;
  clearFailSafe();
  startWatchdog();
  if (loader) loader.classList.remove('is-visible');
}

// Immediately clear any persisted visibility (e.g., after navigation/back-forward cache)
stripVisibility();
window.addEventListener('pageshow', stripVisibility);
window.addEventListener('load', stripVisibility);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) stripVisibility();
});
// Extra guard: after load, ensure hidden within 300ms
window.addEventListener('load', () => {
  setTimeout(resetLoader, 300);
});

function clearFailSafe() {
  if (failSafeTimer) {
    clearTimeout(failSafeTimer);
    failSafeTimer = null;
  }
}

function startWatchdog() {
  if (watchdog) return;
  watchdog = setInterval(() => {
    const loader = dedupeAndGet();
    if (!loader) return;
    if (activeCount === 0 && loader.classList.contains('is-visible')) {
      loader.classList.remove('is-visible');
    }
  }, 5000);
}
