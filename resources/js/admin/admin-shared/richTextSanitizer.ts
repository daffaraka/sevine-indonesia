const ALLOWED_TAGS = new Set([
  'P',
  'BR',
  'STRONG',
  'B',
  'EM',
  'I',
  'U',
  'UL',
  'OL',
  'LI',
  'A',
]);

const SAFE_URL_PATTERN = /^(https?:\/\/|mailto:)/i;

function sanitizeNode(node: Node, targetDoc: Document): Node | null {
  if (node.nodeType === Node.TEXT_NODE) {
    return targetDoc.createTextNode(node.textContent || '');
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const el = node as HTMLElement;
  const tagName = el.tagName.toUpperCase();

  if (!ALLOWED_TAGS.has(tagName)) {
    const fragment = targetDoc.createDocumentFragment();
    Array.from(el.childNodes).forEach((child) => {
      const cleanChild = sanitizeNode(child, targetDoc);
      if (cleanChild) fragment.appendChild(cleanChild);
    });
    return fragment;
  }

  const cleanEl = targetDoc.createElement(tagName.toLowerCase());

  if (tagName === 'A') {
    const href = (el.getAttribute('href') || '').trim();
    if (SAFE_URL_PATTERN.test(href)) {
      cleanEl.setAttribute('href', href);
      cleanEl.setAttribute('target', '_blank');
      cleanEl.setAttribute('rel', 'noopener noreferrer');
    }
  }

  Array.from(el.childNodes).forEach((child) => {
    const cleanChild = sanitizeNode(child, targetDoc);
    if (cleanChild) cleanEl.appendChild(cleanChild);
  });

  return cleanEl;
}

export function sanitizeRichHtml(rawHtml: string): string {
  if (!rawHtml || typeof window === 'undefined') return '';
  const parser = new DOMParser();
  const parsed = parser.parseFromString(rawHtml, 'text/html');
  const container = parsed.createElement('div');

  Array.from(parsed.body.childNodes).forEach((child) => {
    const cleanChild = sanitizeNode(child, parsed);
    if (cleanChild) container.appendChild(cleanChild);
  });

  return container.innerHTML.trim();
}

export function isRichHtmlEmpty(html: string): boolean {
  if (!html) return true;
  const plainText = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .trim();
  return plainText.length === 0;
}
