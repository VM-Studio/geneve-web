// components/product/ProductCarousel.tsx
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type CarouselItem = {
  id: string;
  name: string;
  imageUrl: string;
  to?: string;
  href?: string;
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
    const gap = 24; // gap-6
    const delta = (CARD_WIDTH + gap) * 1.5;
    el.scrollBy({ left: dir === "left" ? -delta : delta, behavior: "smooth" });
  };

  // Tarjeta sin sombra de fondo
  const CardInner: React.FC<{ name: string; imageUrl: string }> = ({ name, imageUrl }) => (
    <div className="relative overflow-hidden rounded-lg bg-white  ring-zinc-200/70">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="absolute inset-0 h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.05] group-hover:-translate-y-0.5"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 grid place-items-center pb-4">
          <span className="rounded-none bg-[#e84e1b] px-5 py-2 text-sm font-extrabold tracking-wide text-white uppercase shadow backdrop-blur font-heading">
            {name}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative">
      {/* Flecha izquierda */}
      <button
        aria-label="Anterior"
        onClick={() => scrollByCards("left")}
        type="button"
        className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center rounded-full bg-[#e67a5d] text-white shadow-lg ring-1 ring-[#e67a5d]/80 transition hover:scale-105 focus:outline-none"
        style={{ outline: "none", boxShadow: "0 0 0 3px transparent" }}
        onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px #e67a5d")}
        onBlur={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px transparent")}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Carril */}
      <div
        ref={trackRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-1 no-scrollbar scroll-smooth pb-12"
        style={{ scrollPaddingInline: "16px" }}
      >
        {items.map((p) => {
          const clickableClasses =
            "group relative block focus:outline-none focus-visible:ring-4 focus-visible:ring-[#e84e1b] rounded-3xl";

          const inner = <CardInner name={p.name} imageUrl={p.imageUrl} />;

          return (
            <article
              key={p.id}
              className="snap-center shrink-0"
              style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
            >
              {p.to ? (
                <Link to={p.to} aria-label={p.name} className={clickableClasses}>
                  {inner}
                </Link>
              ) : p.href ? (
                <a
                  href={p.href}
                  aria-label={p.name}
                  className={clickableClasses}
                  target="_self"
                  rel="noreferrer"
                >
                  {inner}
                </a>
              ) : (
                <button
                  type="button"
                  aria-label={p.name}
                  onClick={() => onItemClick?.(p)}
                  className={`${clickableClasses} w-full h-full text-left`}
                >
                  {inner}
                </button>
              )}

              {/* (Eliminado) barra/sombra inferior de progreso */}
            </article>
          );
        })}
      </div>

      {/* Flecha derecha */}
      <button
        aria-label="Siguiente"
        onClick={() => scrollByCards("right")}
        type="button"
        className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center rounded-full bg-[#e67a5d] text-white shadow-lg ring-1 ring-[#e67a5d]/80 transition hover:scale-105 focus:outline-none"
        style={{ outline: "none", boxShadow: "0 0 0 3px transparent" }}
        onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px #e67a5d")}
        onBlur={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px transparent")}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};
