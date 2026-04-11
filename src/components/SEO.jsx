import { useEffect } from 'react';

const SITE_URL = 'https://abdelrahman2352.github.io';
const SITE_NAME = 'أدوات دُرّة';

export default function SEO({ title, description, path = '/', jsonLd = null }) {
  const fullTitle = title ? `${title} - ${SITE_NAME}` : `${SITE_NAME} - أدوات PDF والصور المجانية`;
  const canonical = `${SITE_URL}${path}`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (selector, value) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attr, attrVal] = selector.replace('[', '').replace(']', '').split('=');
        el.setAttribute(attr, attrVal.replace(/"/g, ''));
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    if (description) {
      setMeta('meta[name="description"]', description);
      setMeta('meta[property="og:description"]', description);
      setMeta('meta[name="twitter:description"]', description);
    }

    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[name="twitter:title"]', fullTitle);
    setMeta('meta[property="og:url"]', canonical);
    setLink('canonical', canonical);

    const prevJsonLd = document.getElementById('page-jsonld');
    if (prevJsonLd) prevJsonLd.remove();

    if (jsonLd) {
      const script = document.createElement('script');
      script.id = 'page-jsonld';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [fullTitle, description, canonical, jsonLd]);

  return null;
}
