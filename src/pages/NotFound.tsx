import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { Seo } from '../components/Seo';
import { track } from '../analytics/track';

const NotFound: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    // Métrica de 404
    track('page_404', { path: pathname });
  }, [pathname]);

  return (
    <>
      <Seo
        title="Página no encontrada | Geneve"
        description="La página solicitada no existe o fue movida. Volvé al inicio o explorá el catálogo."
        canonical={`https://www.geneveobras.com${pathname}`}
        noindex
      />
      <main className="min-h-[60vh] grid place-items-center bg-white">
        <Container className="py-16">
          <section className="mx-auto max-w-xl text-center">
            <div className="inline-flex items-center justify-center rounded-full border border-[#e04f01]/20 bg-[#e04f01]/5 px-3 py-1 text-xs text-[#e04f01]">
              Error 404
            </div>

            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              Página no encontrada
            </h1>

            <p className="mt-3 text-gray-700">
              La URL <span className="font-mono break-all text-gray-900">{pathname}</span> no existe o fue movida.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 font-heading">
              <Button as={Link} to="/" className="bg-[#e04f01] text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al inicio
              </Button>

              <Button
                as={Link}
                to="/catalog"
                variant="outline"
                className="border-2 border-[#e04f01] text-[#e04f01] hover:bg-[#e04f01]/10"
              >
                <Search className="w-4 h-4 mr-2" />
                Ir al Catálogo
              </Button>

              <Button
                as={Link}
                to="/contact"
                variant="outline"
                className="border-2 border-gray-300"
              >
                Contacto
              </Button>
            </div>
          </section>
        </Container>
      </main>
    </>
  );
};

export default NotFound;
