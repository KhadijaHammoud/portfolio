import { useEffect } from 'react';

/** sessionStorage key — one ping per browser tab session. */
const SESSION_KEY = 'portfolio-visit-pinged';

/**
 * Notifies the owner when someone visits the portfolio (production only).
 *
 * Fires a single POST to `/api/visit` on first load per session. The API
 * sends an email via Resend; see `api/visit.ts` and `.env.example` for setup.
 *
 * Requires a Vercel deploy — CRA's dev server does not serve `/api/visit`.
 * Optional: set `REACT_APP_VISIT_NOTIFY_SECRET` (must match `VISIT_NOTIFY_SECRET`).
 */
export function useVisitPing() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    sessionStorage.setItem(SESSION_KEY, '1');

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const secret = process.env.REACT_APP_VISIT_NOTIFY_SECRET;
    if (secret) headers['X-Visit-Secret'] = secret;

    fetch('/api/visit', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        path: window.location.pathname,
        referrer: document.referrer || null,
      }),
      // Survives page unload if the visitor navigates away quickly.
      keepalive: true,
    }).catch(() => {
      // Allow a retry on the next page load if the request failed.
      sessionStorage.removeItem(SESSION_KEY);
    });
  }, []);
}
