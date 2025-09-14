import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { techNotes } from '../data/techNotes';
import { ArrowLeft } from 'lucide-react';

export const TechArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const note = techNotes.find((n) => n.slug === slug);

  if (!note) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Artículo no encontrado</h1>
          <Link to="/tech-info" className="text-[#e04f01] font-medium hover:underline">Volver a Información Técnica</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero del artículo */}
      <section className="relative isolate overflow-hidden [--brand:#e04f01]">
        <div className="absolute inset-0 -z-10">
          <img src={note.heroImage} alt="" className="h-72 w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,.45),rgba(0,0,0,.15),transparent)]" />
        </div>
        <Container className="py-12">
          <Link to="/tech-info" className="inline-flex items-center gap-2 text-white/90 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Link>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white drop-shadow">
            {note.title}
          </h1>
          {note.kicker && <p className="mt-2 text-white/90 font-medium">{note.kicker}</p>}
        </Container>
      </section>

      {/* Cuerpo */}
      <Container className="py-12">
        <article className="prose prose-lg max-w-3xl prose-orange">
          {note.sections.map((s, i) => (
            <section key={i} className="mb-8">
              {s.heading && <h2>{s.heading}</h2>}
              <p>{s.text}</p>
            </section>
          ))}
        </article>
      </Container>
    </div>
  );
};
