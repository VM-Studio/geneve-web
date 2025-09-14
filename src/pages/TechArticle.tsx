// src/pages/TechArticle.tsx
import React, { useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { techNotes } from '../data/techNotes';
import { ArrowLeft, Share2, Tag, ChevronRight } from 'lucide-react';

export const TechArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const note = techNotes.find((n) => n.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!note) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Artículo no encontrado</h1>
          <Link to="/tech-info" className="text-[#e04f01] font-medium hover:underline">
            Volver a Información Técnica
          </Link>
        </div>
      </div>
    );
  }

  const toc = note.sections
    .map((s, i) => (s.heading ? { id: `sec-${i}`, label: s.heading } : null))
    .filter(Boolean) as { id: string; label: string }[];

  return (
    <div className="bg-white">
      {/* Barra superior: Volver (izq) + Acciones (der) */}
      <Container className="pt-6 pb-2">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/tech-info"
            className="inline-flex items-center gap-2 font-semibold text-[#e04f01] hover:opacity-90 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Link>

          <div className="flex items-center gap-2">
            {/* Compartir */}
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: note.title,
                    text: note.excerpt,
                    url: window.location.href,
                  }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="inline-flex items-center gap-2 rounded-full border border-[#e04f01] bg-[#e04f01]/10 px-3 py-1.5 text-[#e04f01] font-medium hover:bg-[#e04f01]/20 transition"
            >
              <Share2 className="h-4 w-4" />
              Compartir
            </button>

            {/* Etiqueta (al lado de Compartir) */}
            {note.tag && (
              <span className="inline-flex items-center gap-2 rounded-full border border-[#e04f01] bg-[#e04f01]/10 px-3 py-1.5 text-[#e04f01] font-medium">
                <Tag className="h-4 w-4" />
                {note.tag}
              </span>
            )}
          </div>
        </div>
      </Container>

      {/* Encabezado + layout en 2 columnas */}
      <Container className="pt-2 pb-10 lg:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-6 lg:gap-10">
          {/* IZQUIERDA: Título + kicker + TARJETA (sin chips ni lectura) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Título y subtítulo alineados con la imagen (sin márgenes superiores extra) */}
            <div className="mt-0">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                {note.title}
              </h1>
              {note.kicker && <p className="mt-2 text-lg text-gray-600">{note.kicker}</p>}
            </div>

            {/* Tarjeta de contenido */}
            <article className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {note.excerpt}
              </p>

              <div className="space-y-8">
                {note.sections.map((s, i) => (
                  <section key={i} id={`sec-${i}`}>
                    {s.heading && (
                      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                        {s.heading}
                      </h2>
                    )}
                    <p className="text-gray-700 leading-relaxed">{s.text}</p>
                  </section>
                ))}
              </div>

              <div className="mt-10 rounded-xl bg-gray-50 border border-gray-200 p-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      ¿Querés asesoramiento técnico?
                    </h3>
                    <p className="text-sm text-gray-600">
                      Te ayudamos a elegir el producto correcto para tu proyecto.
                    </p>
                  </div>
                  <Link
                    to="/catalog"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#e04f01] px-4 py-2 text-white hover:bg-[#cf4700] transition"
                  >
                    Ver productos <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          </div>

          {/* DERECHA: Imagen + Contenido + Relacionados (mismo ancho) */}
          <aside className="lg:col-span-5 space-y-6">
            <figure className="group relative rounded-3xl">
              <div className="rounded-3xl p-[1px] bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100">
                <div className="relative overflow-hidden rounded-[22px] bg-white ring-1 ring-black/5 shadow-sm">
                  <img
                    src={note.heroImage}
                    alt={note.title}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
              <figcaption className="mt-2 text-xs text-gray-500">
                Imagen ilustrativa del producto/ambiente.
              </figcaption>
            </figure>

            {toc.length > 0 && (
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Contenido</h3>
                <nav className="space-y-2">
                  {toc.map((item, i) => (
                    <a
                      key={item.id}
                      href={`#sec-${i}`}
                      className="block text-sm text-gray-700 hover:text-[#e04f01] transition"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            <div className="space-y-4">
              {techNotes
                .filter((n) => n.slug !== note.slug)
                .slice(0, 2)
                .map((n) => (
                  <Link
                    key={n.id}
                    to={`/tech-info/${n.slug}`}
                    className="flex gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm hover:shadow-md transition"
                  >
                    <img
                      src={n.heroImage}
                      alt={n.title}
                      className="h-16 w-20 rounded-lg object-cover"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 line-clamp-2">
                        {n.title}
                      </p>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {n.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
};
