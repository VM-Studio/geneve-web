import { Helmet } from 'react-helmet-async';

type Props = {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;   // URL absoluta (https://...)
  noindex?: boolean;
};

const SITE = 'https://www.geneveobras.com';
const DEFAULT_TITLE = 'Geneve — Catálogo de Productos';
const DEFAULT_DESC =
  'Soluciones confiables para proyectos de construcción, seguridad e iluminación. Entregas a todo el país.';

export function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  canonical,
  image = `${SITE}/titulo.png`,
  noindex = false,
}: Props) {
  const url = typeof window !== 'undefined' ? window.location.href : SITE;
  const canon = canonical || url;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <link rel="canonical" href={canon} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canon} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
