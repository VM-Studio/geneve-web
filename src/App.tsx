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
import { TechArticle } from './pages/TechArticle';   // 👈 agregalo
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
          </div>
        </Router>
      </FiltersProvider>
    </CartProvider>
  );
}

export default App;
