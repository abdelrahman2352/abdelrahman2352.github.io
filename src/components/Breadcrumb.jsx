import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function Breadcrumb({ items }) {
  const SITE_URL = 'https://abdelrahman2352.github.io';

  useEffect(() => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.label,
        item: item.href ? `${SITE_URL}${item.href}` : undefined,
      })),
    };

    const prev = document.getElementById('breadcrumb-jsonld');
    if (prev) prev.remove();

    const script = document.createElement('script');
    script.id = 'breadcrumb-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('breadcrumb-jsonld');
      if (el) el.remove();
    };
  }, [items]);

  return (
    <nav aria-label="breadcrumb" className="text-sm text-gray-500 mb-4">
      <ol className="flex flex-wrap gap-1 items-center list-none p-0 m-0">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-1">
            {idx > 0 && <span aria-hidden="true" className="text-gray-400">›</span>}
            {item.href && idx < items.length - 1 ? (
              <Link to={item.href} className="hover:text-blue-600 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-700 font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
