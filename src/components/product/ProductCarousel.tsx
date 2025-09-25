// components/product/ProductCarousel.tsx
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type CarouselItem = {
  id: string;
  name: string;
  imageUrl: string;  // cada producto tendrá su link de imagen distinto
  to?: string;       // ← ruta interna (SPA) opcional
  href?: string;     // ← URL externa opcional
};

type Props = {
  items: CarouselItem[];
  onItemClick?: (item: CarouselItem) => void;
};

const CARD_WIDTH = 420;
const CARD_HEIGHT = 280;

export const ProductCarousel: React.FC<Props> = ({ items, onItemClick }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCards = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const gap = 24;
    const delta = (CARD_WIDTH + gap) * 1.5;
    el.scrollBy({ left: dir === "left" ? -delta : delta, behavior: "smooth" });
  };

  // Card visual: reutilizamos clases/estilos en Link, <a> o <button>
  const cardStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    textAlign: "left" as const,
    borderRadius: "1rem", // ~ rounded-2xl
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "center",
    boxShadow: "0 10px 24px rgba(0,0,0,0.35)", // sombra original
  };

  const titleBarStyle: React.CSSProperties = {
    backgroundColor: "rgba(232, 78, 27, 0.8)", // #e84e1b con transparencia
  };

  return (
    <div className="relative">
      {/* Flecha izquierda */}
      <button
        aria-label="Anterior"
        onClick={() => scrollByCards("left")}
        className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white shadow border border-gray-200 hover:bg-gray-50 focus:outline-none"
        style={{ outline: "none", boxShadow: "0 0 0 3px transparent" }}
        onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px #e84e1b")}
        onBlur={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px transparent")}
        type="button"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>

      {/* Carril */}
      <div
        ref={trackRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-1 no-scrollbar"
        style={{ scrollPaddingInline: "16px" }}
      >
        {items.map((p) => {
          const bgStyle: React.CSSProperties = {
            ...cardStyle,
            backgroundImage: `url("${p.imageUrl}")`,
          };

          const Inner = (
            <>
              {/* Franja inferior con el título en naranja translúcido */}
              <div className="absolute bottom-0 left-0 right-0 px-6 py-3" style={titleBarStyle}>
                <h3 className="text-white text-lg font-semibold">{p.name}</h3>
              </div>
            </>
          );

          return (
            <article
              key={p.id}
              className="snap-start shrink-0 relative"
              style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
            >
              {/* Preferencia: to > href > button */}
              {p.to ? (
                <Link
                  to={p.to}
                  aria-label={p.name}
                  className="relative block focus:outline-none focus-visible:ring-4 focus-visible:ring-[#e84e1b]"
                  style={bgStyle}
                >
                  {Inner}
                </Link>
              ) : p.href ? (
                <a
                  href={p.href}
                  aria-label={p.name}
                  className="relative block focus:outline-none focus-visible:ring-4 focus-visible:ring-[#e84e1b]"
                  style={bgStyle}
                  target="_self" // cambiá a "_blank" si querés nueva pestaña
                  rel="noreferrer"
                >
                  {Inner}
                </a>
              ) : (
                <button
                  type="button"
                  aria-label={p.name}
                  onClick={() => onItemClick?.(p)}
                  className="relative block w-full h-full text-left rounded-2xl overflow-hidden focus:outline-none focus-visible:ring-4 focus-visible:ring-[#e84e1b]"
                  style={bgStyle}
                >
                  {Inner}
                </button>
              )}
            </article>
          );
        })}
      </div>

      {/* Flecha derecha */}
      <button
        aria-label="Siguiente"
        onClick={() => scrollByCards("right")}
        className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white shadow border border-gray-200 hover:bg-gray-50 focus:outline-none"
        style={{ outline: "none", boxShadow: "0 0 0 3px transparent" }}
        onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px #e84e1b")}
        onBlur={(e) => (e.currentTarget.style.boxShadow = "0 0 0 4px transparent")}
        type="button"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
};
