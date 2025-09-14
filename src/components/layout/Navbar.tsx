import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useCart } from '../../store/CartContext';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const location = useLocation();
  const totalItems = getTotalItems();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Catálogo', href: '/catalog' },
    { name: 'Obras', href: '/works' },
    { name: 'Información Técnica', href: '/tech-info' },
    { name: 'Certificaciones', href: '/certifications' },
    { name: 'Contacto', href: '/contact' },
  ];

  const isActiveLink = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const isHome = location.pathname === '/';
  const budgetIconSrc = isHome ? '/presupuesto.png' : '/presupuestodos.png';

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
        {/* fila principal: logo izq (solo no-home) + menú centrado + presupuesto/menú mobile der */}
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
          <div className="flex-1 flex justify-center">
            <div className="hidden md:flex items-center space-x-12">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={[
                    'text-sm font-bold transition-colors outline-none focus:outline-none',
                    isHome
                      ? (isActiveLink(item.href)
                          ? 'text-[#e84e1b] border-b-2 border-[#e84e1b] pb-1 bg-white/90 rounded-t'
                          : 'text-gray-900 hover:text-[#e84e1b]')
                      : (isActiveLink(item.href)
                          ? 'text-white border-b-2 border-white pb-1'
                          : 'text-white/90 hover:text-white')
                  ].join(' ')}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Botón Presupuesto + botón mobile (derecha) */}
          <div className="flex items-center gap-1">
            <Link
              to="/quote"
              className={[
                'relative p-1 hover:opacity-90 transition-opacity outline-none focus:outline-none',
                isHome ? 'text-[#e84e1b]' : 'text-white'
              ].join(' ')}
              aria-label={`Presupuesto con ${totalItems} ítems`}
            >
              <span className="sr-only">Presupuesto</span>

              {/* Ícono de presupuesto (imagen) según sección */}
              <img
                src={budgetIconSrc}
                alt=""
                aria-hidden="true"
                className="w-9 h-9 md:w-11 md:h-11 object-contain shrink-0"
              />

              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#e84e1b] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {/* Botón mobile */}
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
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={[
                  'block px-4 py-2 rounded-lg text-base font-bold transition-colors outline-none focus:outline-none',
                  isHome
                    ? (isActiveLink(item.href)
                        ? 'text-white bg-[#e84e1b]'
                        : 'text-gray-900 hover:text-[#e84e1b] bg-white/90')
                    : (isActiveLink(item.href)
                        ? 'text-[#e84e1b] bg-white'
                        : 'text-white hover:bg-white/10')
                ].join(' ')}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
