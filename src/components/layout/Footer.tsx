import React from 'react';
import { Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#e04f01] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Grid principal con divisores entre columnas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 md:divide-x md:divide-white/20">
          {/* Columna 1: Descripción (sin logo ni botón) */}
          <div className="space-y-3 md:pr-6">
            <h3 className="text-lg font-semibold text-white">Geneve</h3>
            <p className="text-white/90 text-sm leading-relaxed">
              Soluciones confiables para proyectos de construcción, seguridad e
              iluminación. Más de 20 años brindando servicios a clientes
              residenciales y comerciales.
            </p>
          </div>

          {/* Columna 2: Contacto (sin ubicación) */}
          <div className="space-y-3 md:px-6">
            <h3 className="text-lg font-semibold text-white">Contacto</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="text-white/90">+54 11 1234-5678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="text-white/90">info@geneve.com.ar</span>
              </div>
            </div>
          </div>

          {/* Columna 3: Enlaces Rápidos */}
          <div className="space-y-3 md:px-6">
            <h3 className="text-lg font-semibold text-white">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/catalog" className="text-white/90 hover:text-white">
                  Catálogo de Productos
                </a>
              </li>
              <li>
                <a href="/tech-info" className="text-white/90 hover:text-white">
                  Información Técnica
                </a>
              </li>
              <li>
                <a href="/certifications" className="text-white/90 hover:text-white">
                  Certificaciones
                </a>
              </li>
              <li>
                <a href="/works" className="text-white/90 hover:text-white">
                  Nuestras Obras
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Horarios */}
          <div className="space-y-3 md:pl-6">
            <h3 className="text-lg font-semibold text-white">Horarios</h3>
            <div className="space-y-2 text-sm text-white/90">
              <p>
                Lunes - Viernes
                <br />9:00 AM - 6:00 PM
              </p>
              <p>
                Sábado
                <br />9:00 AM - 1:00 PM
              </p>
              
            </div>
          </div>
        </div>

        {/* Línea inferior compacta */}
        <div className="border-t border-white/20 mt-6 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-sm text-white/80">
              © {currentYear} Geneve. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/80">
              <a href="/privacy" className="hover:text-white">Política de Privacidad</a>
              <a href="/terms" className="hover:text-white">Términos de Servicio</a>
              <a href="/sitemap" className="hover:text-white">Mapa del Sitio</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
