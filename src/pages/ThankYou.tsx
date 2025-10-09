import { Link } from 'react-router-dom';

export default function ThankYou() {
  return (
    <main className="min-h-[60vh] grid place-items-center bg-white">
      <section className="max-w-xl w-full text-center px-6">
        <div className="inline-flex items-center justify-center rounded-full border border-[#e04f01]/20 bg-[#e04f01]/5 px-3 py-1 text-xs text-[#e04f01]">
          ¡Enviado con éxito!
        </div>

        <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
          Gracias por contactarnos
        </h1>

        <p className="mt-3 text-gray-700">
          En breve estaremos asesorándote.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            to="/catalog"
            className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-semibold
                       bg-[#e04f01] text-white hover:opacity-95 active:translate-y-px
                       focus:outline-none focus-visible:ring-4 focus-visible:ring-[#e04f01]/30"
          >
            ← Volver al catálogo
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm hover:bg-gray-50"
          >
            Ir al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}
