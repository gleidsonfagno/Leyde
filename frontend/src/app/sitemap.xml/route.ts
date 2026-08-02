import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const staticUrls = ['/', '/products', '/categories', '/brands', '/admin'];
  const urls = staticUrls.map((u) => `  <url><loc>${baseUrl}${u}</loc><changefreq>daily</changefreq></url>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: { 'Content-Type': 'application/xml' }
  });
}
