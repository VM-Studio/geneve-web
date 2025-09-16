import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartProvider } from './store/CartContext';
import { FiltersProvider } from './store/FiltersContext';
import { ToastContainer } from './components/ui/Toast';

// Import pages
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { Product } from './pages/Product';
import { Quote } from './pages/Quote';
import { Works } from './pages/Works';
import { TechInfo } from './pages/TechInfo';
import { TechArticle } from './pages/TechArticle';
import { Certifications } from './pages/Certifications';
import { Contact } from './pages/Contact';

// Import styles
import './styles/variables.css';
import './styles/globals.css';

function App() {
  return (
    <CartProvider>
      <FiltersProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/product/:slug" element={<Product />} />
                <Route path="/quote" element={<Quote />} />
                <Route path="/works" element={<Works />} />

                {/* 👇 Rutas para la parte técnica */}
                <Route path="/tech-info" element={<TechInfo />} />
                <Route path="/tech-info/:slug" element={<TechArticle />} />

                <Route path="/certifications" element={<Certifications />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
            <ToastContainer />

            {/* 🚀 Botón flotante de WhatsApp */}
            <a
              href="https://wa.me/5491159278803?text=Hola%20Geneve%2C%20quiero%20hacer%20una%20consulta."
              target="_blank"
              rel="noreferrer"
              className="fixed bottom-5 right-5 z-50 bg-green-500 rounded-full p-4 shadow-lg hover:scale-110 transition-transform"
            >
              {/* Logo de WhatsApp en SVG (no necesitás imagen extra) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="h-7 w-7 text-white"
                fill="currentColor"
              >
                <path d="M16 .4A15.6 15.6 0 0 0 .4 16c0 2.7.7 5.3 2 7.6L0 32l8.6-2.3c2.3 1.3 4.9 2 7.6 2 8.6 0 15.6-7 15.6-15.6S24.6.4 16 .4Zm0 28.5c-2.5 0-4.9-.7-7-2.1l-.5-.3-5.1 1.4 1.4-5-.3-.5a12.6 12.6 0 0 1-2-6.9C2.5 8.5 8.6 2.4 16 2.4c7.4 0 13.5 6.1 13.5 13.6 0 7.4-6.1 13.6-13.5 13.6Zm7.4-9.9c-.4-.2-2.5-1.2-2.9-1.3s-.7-.2-1 .2c-.3.4-1.1 1.3-1.3 1.6-.2.2-.5.3-.9.1-.4-.2-1.7-.6-3.2-1.9-1.2-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.5.5-.8.2-.3.1-.6 0-.8-.1-.2-1-2.4-1.4-3.3-.4-.9-.7-.8-1-.8h-.9c-.3 0-.8.1-1.2.6-.4.4-1.6 1.5-1.6 3.6s1.6 4.2 1.8 4.5c.2.2 3.1 4.8 7.6 6.7 1.1.5 2 .8 2.7 1 .9.3 1.7.2 2.3.1.7-.1 2.5-1 2.9-2 .4-1 .4-1.8.3-2 0-.2-.3-.3-.7-.5Z"/>
              </svg>
            </a>
          </div>
        </Router>
      </FiltersProvider>
    </CartProvider>
  );
}

export default App;
