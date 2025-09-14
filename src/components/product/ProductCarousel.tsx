import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselItem = {
  id: string;
  name: string;
  imageUrl: string; // cada producto tendrá su link de imagen distinto
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

  return (
    <div className="relative">
     {/* Flecha izquierda */}
<button
  aria-label="Anterior"
  onClick={() => scrollByCards("left")}
  className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white shadow border border-gray-200 hover:bg-gray-50 focus:outline-none"
  style={{
    outline: "none",
    boxShadow: "0 0 0 3px transparent",
  }}
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
        {items.map((p) => (
          <article
            key={p.id}
            className="snap-start shrink-0"
            style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
          >
            <button
              type="button"
              aria-label={p.name}
              onClick={() => onItemClick?.(p)}
              className="relative block w-full h-full text-left rounded-2xl overflow-hidden focus:outline-none focus-visible:ring-4 focus-visible:ring-[#e84e1b]"
              style={{
                backgroundImage: `url("${p.imageUrl}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                // Sombra negra para resaltar cada tarjeta
                boxShadow: "0 10px 24px rgba(0,0,0,0.35)",
              }}
            >
              {/* Franja inferior con el título en naranja translúcido */}
              <div
                className="absolute bottom-0 left-0 right-0 px-6 py-3"
                style={{
                  backgroundColor: "rgba(232, 78, 27, 0.8)", // #e84e1b con transparencia
                }}
              >
                <h3 className="text-white text-lg font-semibold">{p.name}</h3>
              </div>
            </button>
          </article>
        ))}
      </div>

      {/* Flecha derecha */}
<button
  aria-label="Siguiente"
  onClick={() => scrollByCards("right")}
  className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white shadow border border-gray-200 hover:bg-gray-50 focus:outline-none"
  style={{
    outline: "none",
    boxShadow: "0 0 0 3px transparent",
  }}
  onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px #e84e1b")}
  onBlur={(e) => (e.currentTarget.style.boxShadow = "0 0 0 4px transparent")}
  type="button"
>
  <ChevronRight className="w-5 h-5 text-gray-700" />
</button>
    </div>
  );
};
