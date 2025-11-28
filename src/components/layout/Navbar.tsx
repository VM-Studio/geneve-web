import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', to: '/' },
    { name: 'Catálogo', to: '/catalog' },
    { name: 'Obras', to: '/works' },
    { name: 'Información Técnica', to: '/tech-info' },
    { name: 'Certificaciones', to: '/certifications' },
    { name: 'Contacto', to: '/contact' },
  ];

  const isHome = location.pathname === '/';

  return (
    <nav
      className={
        isHome
          ? `
        sticky top-0 z-40 bg-white relative
        after:content-[''] after:absolute after:inset-x-0 after:bottom-0
        after:h-1 after:bg-gradient-to-b after:from-white/55 after:to-transparent
      `
          : `
        sticky top-0 z-40 bg-[#e84e1b]
      `
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* fila principal: logo izq (solo no-home) + menú centrado + botón mobile der */}
        <div className="flex items-center h-16">
          {/* Logo izquierda: solo cuando NO es Home */}
          <div className="w-28 flex items-center">
            {!isHome && (
              <Link to="/" className="inline-flex items-center">
                <img
                  src="/logo.png"
                  alt="GENEVE"
                  className="h-8 w-auto object-contain"
                />
              </Link>
            )}
          </div>

          {/* Navegación centrada */}
          <div className="flex-1 flex justify-center font-heading">
            <div className="hidden md:flex items-center space-x-12">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    [
                      'text-sm font-bold transition-colors outline-none focus:outline-none',
                      isHome
                        ? isActive
                          ? 'text-[#e84e1b] border-b-2 border-[#e84e1b] pb-1 bg-white/90 rounded-t'
                          : 'text-gray-900 hover:text-[#e84e1b]'
                        : isActive
                          ? 'text-white border-b-2 border-white pb-1'
                          : 'text-white/90 hover:text-white'
                    ].join(' ')
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Botón mobile (derecha) */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={[
                'md:hidden p-2 hover:opacity-90 transition-opacity outline-none focus:outline-none',
                isHome ? 'text-[#e84e1b]' : 'text-white'
              ].join(' ')}
              aria-label="Abrir menú de navegación"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Navegación mobile */}
        <div
          className={`
            md:hidden transition-all duration-300 ease-in-out overflow-hidden
            ${isMenuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="pt-2 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  [
                    'block px-4 py-2 rounded-lg text-base font-bold transition-colors outline-none focus:outline-none',
                    isHome
                      ? isActive
                        ? 'text-white bg-[#e84e1b]'
                        : 'text-gray-900 hover:text-[#e84e1b] bg-white/90'
                      : isActive
                        ? 'text-[#e84e1b] bg-white'
                        : 'text-white hover:bg-white/10'
                  ].join(' ')
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
