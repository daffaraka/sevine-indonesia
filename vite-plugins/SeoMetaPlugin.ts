import type { Plugin } from 'vite';

/**
 * SEO build plugin — single source of truth for the public site URL.
 *
 * - Replaces every `%SITE_URL%` token in `index.html` (canonical, Open Graph, JSON-LD).
 * - Emits `robots.txt` and `sitemap.xml` into the build output.
 *
 * Change the domain via the `VITE_SITE_URL` env var (e.g. in Vercel Project Settings),
 * or update `DEFAULT_SITE_URL` once the final domain is ready.
 */
export const DEFAULT_SITE_URL = 'https://sevine-indonesia.vercel.app';

const SITE_URL_TOKEN = /%SITE_URL%/g;

const normalizeSiteUrl = (rawUrl: string): string => rawUrl.trim().replace(/\/+$/, '');

const buildRobotsTxt = (siteUrl: string): string =>
  ['User-agent: *', 'Allow: /', '', `Sitemap: ${siteUrl}/sitemap.xml`, ''].join('\n');

const buildSitemapXml = (siteUrl: string, lastModifiedDate: string): string =>
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <url>',
    `    <loc>${siteUrl}/</loc>`,
    `    <lastmod>${lastModifiedDate}</lastmod>`,
    '  </url>',
    '</urlset>',
    '',
  ].join('\n');

export const seoMetaPlugin = (rawSiteUrl: string = DEFAULT_SITE_URL): Plugin => {
  const siteUrl = normalizeSiteUrl(rawSiteUrl);

  return {
    name: 'sevine-seo-meta',
    // `pre` wajib: Vite mem-parse URL di <link>/<meta> sebelum hook normal, token mentah dianggap URI rusak.
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replace(SITE_URL_TOKEN, siteUrl),
    },
    generateBundle() {
      const lastModifiedDate = new Date().toISOString().slice(0, 10);
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: buildRobotsTxt(siteUrl) });
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: buildSitemapXml(siteUrl, lastModifiedDate),
      });
    },
  };
};
