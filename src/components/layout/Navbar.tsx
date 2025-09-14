import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
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

  return (
    <nav className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* fila principal: menú centrado + carrito a la derecha */}
        <div className="flex justify-between items-center h-16">
          {/* Navegación centrada */}
          <div className="flex-1 flex justify-center">
            <div className="hidden md:flex items-center space-x-12">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    text-sm font-medium transition-colors outline-none focus:outline-none
                    ${isActiveLink(item.href)
                      ? 'text-[#e84e1b] border-b-2 border-[#e84e1b] pb-1'
                      : 'text-gray-900 hover:text-[#e84e1b]'
                    }
                  `}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Carrito (derecha) */}
          <div className="flex items-center">
            <Link
              to="/quote"
              className="relative p-2 text-[#e84e1b] hover:opacity-90 transition-opacity outline-none focus:outline-none"
              aria-label={`Shopping cart with ${totalItems} items`}
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#e84e1b] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {/* Botón mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-[#e84e1b] hover:opacity-90 transition-opacity outline-none focus:outline-none"
              aria-label="Toggle navigation menu"
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
          <div className="pt-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`
                  block px-4 py-2 rounded-lg text-base font-medium transition-colors outline-none focus:outline-none
                  ${isActiveLink(item.href)
                    ? 'text-white bg-[#e84e1b]'
                    : 'text-gray-900 hover:text-[#e84e1b]'
                  }
                `}
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
