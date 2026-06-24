import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Vercel serverless handler for portfolio visit notifications.
 *
 * Receives a POST from `useVisitPing`, enriches it with geo/device data from
 * request headers, and emails the owner via Resend.
 *
 * Required env (Vercel + `.env.local` for `vercel dev`):
 * - `RESEND_API_KEY`
 * - `VISIT_NOTIFY_EMAIL`
 *
 * Optional:
 * - `VISIT_NOTIFY_FROM` — verified sender (defaults to Resend's test address)
 * - `VISIT_NOTIFY_SECRET` — must match `REACT_APP_VISIT_NOTIFY_SECRET` on the client
 */

/** Skip crawlers and link-preview bots so they don't trigger emails. */
const BOT_PATTERN =
  /bot|crawl|spider|slurp|mediapartners|facebookexternalhit|whatsapp|telegram|preview/i;

type VisitPayload = {
  path?: string;
  referrer?: string | null;
};

type VisitDetails = {
  device: string;
  location: string;
  path: string;
  referrer: string;
  time: string;
};

function header(
  headers: VercelRequest['headers'],
  name: string,
): string | undefined {
  const value = headers[name];
  return Array.isArray(value) ? value[0] : value;
}

function parseDevice(userAgent: string): string {
  // Edge must be checked before Chrome — Edge UA strings include "Chrome".
  let browser = 'Unknown browser';
  if (/edg\//i.test(userAgent)) browser = 'Edge';
  else if (/chrome/i.test(userAgent)) browser = 'Chrome';
  else if (/safari/i.test(userAgent)) browser = 'Safari';
  else if (/firefox/i.test(userAgent)) browser = 'Firefox';

  let os = 'Unknown OS';
  if (/windows/i.test(userAgent)) os = 'Windows';
  else if (/macintosh|mac os/i.test(userAgent)) os = 'macOS';
  else if (/android/i.test(userAgent)) os = 'Android';
  else if (/iphone|ipad/i.test(userAgent)) os = 'iOS';
  else if (/linux/i.test(userAgent)) os = 'Linux';

  return `${browser} on ${os}`;
}

function formatLocation(headers: VercelRequest['headers']): string {
  // Populated by Vercel from the visitor's IP — not available outside Vercel.
  const city = header(headers, 'x-vercel-ip-city');
  const region = header(headers, 'x-vercel-ip-country-region');
  const country = header(headers, 'x-vercel-ip-country');
  const parts = [city, region, country].filter(Boolean);

  return parts.length > 0 ? parts.join(', ') : 'Unknown';
}

function formatReferrer(referrer: string | null | undefined): string {
  if (!referrer) return 'Direct visit';

  try {
    const url = new URL(referrer);
    return url.hostname + (url.pathname !== '/' ? url.pathname : '');
  } catch {
    return referrer;
  }
}

function buildEmailHtml(details: VisitDetails): string {
  const rows = [
    ['Time', details.time],
    ['Location', details.location],
    ['Device', details.device],
    ['Referrer', details.referrer],
    ['Page', details.path],
  ];

  const body = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;color:#666;font-weight:600;">${label}</td><td style="padding:8px 12px;">${value}</td></tr>`,
    )
    .join('');

  return `
    <div style="font-family:sans-serif;max-width:480px;">
      <h2 style="margin:0 0 16px;">Someone visited your portfolio</h2>
      <table style="border-collapse:collapse;width:100%;">${body}</table>
    </div>
  `;
}

async function sendVisitEmail(
  details: VisitDetails,
  apiKey: string,
  toEmail: string,
): Promise<void> {
  // onboarding@resend.dev only delivers to the Resend account owner's email.
  const from =
    process.env.VISIT_NOTIFY_FROM ?? 'Portfolio <onboarding@resend.dev>';

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [toEmail],
      subject: 'New portfolio visit',
      html: buildEmailHtml(details),
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const secret = process.env.VISIT_NOTIFY_SECRET;
  if (secret && header(req.headers, 'x-visit-secret') !== secret) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.VISIT_NOTIFY_EMAIL;
  if (!apiKey || !toEmail) {
    res.status(500).json({ error: 'Not configured' });
    return;
  }

  const userAgent = header(req.headers, 'user-agent') ?? '';
  if (!userAgent || BOT_PATTERN.test(userAgent)) {
    // 204 — silently ignore bots (not an error from the client's perspective).
    res.status(204).end();
    return;
  }

  const body = (req.body ?? {}) as VisitPayload;
  const path = typeof body.path === 'string' ? body.path : '/';

  const details: VisitDetails = {
    time: new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'UTC',
      timeZoneName: 'short',
    }),
    location: formatLocation(req.headers),
    device: parseDevice(userAgent),
    referrer: formatReferrer(body.referrer),
    path,
  };

  try {
    await sendVisitEmail(details, apiKey, toEmail);
    res.status(204).end();
  } catch {
    res.status(500).json({ error: 'Failed to send notification' });
  }
}
