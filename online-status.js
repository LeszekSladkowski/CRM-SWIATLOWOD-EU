(() => {
  'use strict';

  const status = document.getElementById('onlineStatus');
  if (!status) return;

  const label = status.querySelector('[data-status-label="online"]');
  let checkToken = 0;

  const render = (isOnline) => {
    status.classList.toggle('status-on', isOnline);
    status.classList.toggle('status-off', !isOnline);
    status.classList.toggle('online', isOnline);
    status.dataset.connection = isOnline ? 'online' : 'offline';
    if (label) label.textContent = isOnline ? 'ONLINE' : 'BRAK';
    status.setAttribute('aria-label', isOnline ? 'Internet: ONLINE' : 'Internet: BRAK');
  };

  const verify = async () => {
    const token = ++checkToken;
    if (!navigator.onLine) {
      render(false);
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 4500);
    try {
      const url = new URL('./version.json', window.location.href);
      url.searchParams.set('online-check', String(Date.now()));
      const response = await fetch(url.href, {
        method: 'GET',
        cache: 'no-store',
        credentials: 'same-origin',
        signal: controller.signal
      });
      if (token === checkToken) render(response.ok);
    } catch (_) {
      if (token === checkToken) render(false);
    } finally {
      window.clearTimeout(timeout);
    }
  };

  window.addEventListener('online', verify, { passive: true });
  window.addEventListener('offline', () => render(false), { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) verify();
  });

  render(false);
  verify();
  window.setInterval(verify, 10000);
})();
