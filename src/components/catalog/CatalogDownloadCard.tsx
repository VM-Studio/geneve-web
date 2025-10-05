import React from "react";

/** Tarjeta horizontal y compacta para descargar el catálogo completo */
export const CatalogDownloadCard: React.FC = () => {
  return (
    <article className="group relative w-full overflow-hidden rounded-2xl border border-[#e84e1b] bg-white shadow-[0_14px_48px_-18px_rgba(2,6,23,.25)]">

      <div className="grid grid-cols-[94px_1fr_auto] items-center gap-3 p-3 md:p-3.5">
        {/* Mini preview (sin assets externos) */}
        <div className="relative h-[74px] w-[74px] overflow-hidden rounded-xl border border-zinc-200 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(232,78,27,0.12),transparent_70%)] grid place-items-center">
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "#e84e1b" }}>
            <path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14" />
          </svg>
          <span className="absolute left-1.5 top-1.5 rounded-md bg-white/90 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-800 border border-zinc-200">
            PDF
          </span>
        </div>

        {/* Texto */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-[15px] md:text-base font-bold leading-tight truncate">
              Catálogo Completo
            </h2>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-700 border-emerald-200">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Vigente
            </span>
          </div>
          <p className="mt-0.5 text-[12px] text-zinc-600 line-clamp-1 md:line-clamp-2">
            Obras, eléctrica y accesorios · Fichas + guías · v3.2 · act. 04/10/25
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10.5px] text-zinc-700">Obra</span>
            <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10.5px] text-zinc-700">Eléctrica</span>
            <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10.5px] text-zinc-700">Completo</span>
          </div>
        </div>

        {/* Acciones (naranja #e84e1b y blanco) */}
        <div className="flex flex-col items-end gap-2">
        <a
  href="/catalogo/completo.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="
    inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold
    border-zinc-200 text-zinc-800 bg-white
    hover:bg-zinc-50
    active:bg-[#e84e1b]/10 active:translate-y-px
    focus:outline-none focus-visible:ring-4 focus-visible:ring-[#e84e1b]/25 focus-visible:ring-offset-0
    transition no-tap-highlight
  "
>
  Ver
</a>

<a
  href="/catalogo/completo.pdf"
  download="catalogo-completo.pdf"
  className="
    inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold
    border-[#e84e1b]/80 text-[#e84e1b] bg-white
    hover:bg-[#e84e1b]/5
    active:bg-[#e84e1b]/15 active:translate-y-px
    focus:outline-none focus-visible:ring-4 focus-visible:ring-[#e84e1b]/25 focus-visible:ring-offset-0
    transition no-tap-highlight
  "
>
  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14" />
  </svg>
  Descargar
</a>


        </div>
      </div>

      {/* Acento inferior animado */}
      <div
        className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
        style={{ backgroundColor: "#e84e1b" }}
      />
    </article>
  );
};
