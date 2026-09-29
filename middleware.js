import { next } from '@vercel/functions';

// The share link is available for one day, including direct video requests.
const expiresAt = Date.parse('2026-09-30T12:30:00Z');

export const config = { matcher: '/:path*', runtime: 'nodejs' };

export default function middleware() {
  if (Date.now() >= expiresAt) {
    return new Response('This welcome-back link has expired.', {
      status: 410,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  }
  return next();
}
