// src/pages/TechInfo.tsx
import React from 'react';
import { Container } from '../components/layout/Container';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { techNotes } from '../data/techNotes';

export const TechInfo: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-[#e04f01]/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-orange-300/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(transparent_39px,_#0000000f_40px),linear-gradient(90deg,transparent_39px,_#0000000f_40px)] bg-[size:40px_40px]" />
      </div>

      <Container className="py-14 lg:py-18">
       {/* Header simplificado */}
<div className="mb-4">
  <span className="inline-block bg-orange-50 text-orange-600 text-sm font-medium px-4 py-1.5 rounded-full border border-orange-200">
    • Información Técnica
  </span>
</div>


        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {techNotes.map((n) => (
            <article
              key={n.id}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-[0_20px_45px_-20px_rgba(0,0,0,.25)] ring-1 ring-gray-200 transition-transform duration-300 ease-out hover:-translate-y-1.5"
            >
              <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[conic-gradient(from_180deg_at_50%_50%,_rgba(224,79,1,.45),transparent_30%,transparent_70%,rgba(224,79,1,.45))]" />
              <Link to={`/tech-info/${n.slug}`} className="relative block overflow-hidden rounded-3xl p-3">
                <div className="relative overflow-hidden rounded-2xl ring-1 ring-gray-100">
                  <img
                    src={n.heroImage}
                    alt={n.title}
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/0 via-black/0 to-black/10" />
                </div>
                {n.tag && (
                  <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm ring-1 ring-black/5 backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#e04f01]" />
                    {n.tag}
                  </span>
                )}
              </Link>

              <div className="relative z-[1] px-6 pb-6">
                <Link to={`/tech-info/${n.slug}`} className="group/ttl block pt-2">
                  <h2 className="text-[1.55rem] font-extrabold leading-tight text-gray-900">{n.title}</h2>
                  <span className="mt-1 block h-[3px] w-0 rounded-full bg-gradient-to-r from-[#e04f01] to-orange-300 transition-all duration-300 group-hover/ttl:w-24" />
                </Link>
                {n.kicker && <div className="mt-3 text-[0.95rem] font-extrabold tracking-tight text-gray-700">{n.kicker}</div>}
                <p className="mt-3 text-[15px] leading-7 text-gray-600">{n.excerpt}</p>
                <div className="mt-5">
                  <Link
                    to={`/tech-info/${n.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-[#e04f01] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e04f01]/40"
                  >
                    Leer Más
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>

              <div className="pointer-events-none absolute -bottom-20 left-1/2 h-40 w-2/3 -translate-x-1/2 rounded-[100%] bg-[#e04f01]/10 blur-2xl" />
            </article>
          ))}
        </div>
      </Container>
    </div>
  );
};
