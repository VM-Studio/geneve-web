import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus, MessageCircle, FileText } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { Textarea } from '../components/ui/Textarea';
import { useCart } from '../store/CartContext';
import { useWhatsAppMessage } from '../hooks/useWhatsAppMessage';
import jsPDF from 'jspdf';

/** Genera un PDF (Blob) con el detalle del presupuesto */
function createQuotePdfBlob(
  items: Array<{ name: string; sku: string; quantity: number }>,
  notes: string
): { blob: Blob; filename: string } {
  const doc = new jsPDF();

  // Encabezado
  doc.setFontSize(18);
  doc.text('Solicitud de Presupuesto', 14, 18);

  doc.setFontSize(12);
  let y = 28;

  // Tabla simple de productos
  doc.setFont(undefined, 'bold');
  doc.text('Productos:', 14, y);
  y += 8;
  doc.setFont(undefined, 'normal');

  items.forEach((it, idx) => {
    const line = `${idx + 1}. ${it.name}  |  SKU: ${it.sku}  |  Cantidad: ${it.quantity}`;
    const lines = doc.splitTextToSize(line, 180);
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
    doc.text(lines, 14, y);
    y += 8;
  });

  if (notes) {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
    doc.setFont(undefined, 'bold');
    doc.text('Notas del solicitante:', 14, y);
    y += 8;
    doc.setFont(undefined, 'normal');
    const noteLines = doc.splitTextToSize(notes, 180);
    doc.text(noteLines, 14, y);
  }

  const blob = doc.output('blob') as Blob;
  return { blob, filename: 'presupuesto-geneve.pdf' };
}

export const Quote: React.FC = () => {
  const [notes, setNotes] = useState('');
  const { items, removeItem, incrementItem, decrementItem, clearCart, getTotalItems } = useCart();
  const { sendQuote } = useWhatsAppMessage();

  const handleSendQuote = async () => {
    if (items.length === 0) {
      alert('Please add items to your quote before sending.');
      return;
    }

    // 1) Generar el PDF
    const { blob, filename } = createQuotePdfBlob(
      items.map(i => ({ name: i.name, sku: i.sku, quantity: i.quantity })),
      notes
    );

    // 2) Intentar compartir el PDF (móvil con Web Share API + files)
    try {
      const canShareFiles =
        typeof navigator !== 'undefined' &&
        'canShare' in navigator &&
        // @ts-ignore - canShare type narrow
        typeof navigator.canShare === 'function' &&
        // @ts-ignore
        navigator.canShare({ files: [new File([blob], filename, { type: 'application/pdf' })] });

      if (canShareFiles) {
        const file = new File([blob], filename, { type: 'application/pdf' });
        // @ts-ignore
        await navigator.share({
          files: [file],
          text: 'Hola Geneve, te envío mi solicitud de presupuesto. Adjunto PDF con el detalle.',
          title: 'Solicitud de Presupuesto',
        });
        // Luego de compartir, igual disparamos el flujo de WhatsApp para el mensaje (opcional):
        sendQuote({ items, notes });
        return;
      }
    } catch {
      // Si falla share, seguimos al fallback
    }

    // 3) Fallback (desktop): descargar el PDF y abrir WhatsApp con el mensaje pre-armado
    try {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Si por alguna razón no podemos descargar, igual continuamos con WhatsApp
    }

    // 4) Abrir WhatsApp con tu mensaje actual
    sendQuote({ items, notes });
  };

  const totalItems = getTotalItems();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Container className="py-16">
          <div className="text-center max-w-lg mx-auto">
            <div className="text-gray-400 mb-6"></div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              No hay productos seleccionados.
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Empezá agregando productos de nuestro catálogo para solicitar un presupuesto.
            </p>
            <Button as={Link} to="/catalog" size="lg" className="inline-flex items-center space-x-2">
              <span>Ver Catálogo</span>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              to="/catalog"
              className="mb-4 inline-flex items-center gap-2 text-[#e84e1b] font-bold hover:text-[#cf4700] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e84e1b]/30 rounded-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al Catálogo</span>
            </Link>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Solicitud de Presupuesto
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              {totalItems} Productos{totalItems !== 1 ? 's' : ''} en tu presupuesto
            </p>
          </div>

          {items.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 hover:border-red-300"
            >
              Borrar Todo
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quote Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${Math.random()}`}
                className="
                  bg-white rounded-2xl border border-gray-100 p-6
                  shadow-[0_8px_30px_rgba(2,8,20,0.06)]
                  hover:shadow-[0_12px_40px_rgba(2,8,20,0.08)]
                  transition-shadow
                "
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="w-full sm:w-24 h-48 sm:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      SKU: {item.sku}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-700">Cantidad:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => decrementItem(item.id)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 font-medium min-w-16 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => incrementItem(item.id)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quote Summary */}
          <div
            className="
              bg-white rounded-2xl border border-gray-100 p-6 h-fit sticky top-24
              shadow-[0_10px_30px_rgba(2,8,20,0.06)]
              hover:shadow-[0_12px_40px_rgba(2,8,20,0.08)]
              transition-shadow
            "
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Resumen de Productos
            </h2>

            {/* Items Summary */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total de Productos:</span>
                <span className="font-medium">{totalItems}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Líneas de Productos:</span>
                <span className="font-medium">{items.length}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mb-6">
              <Textarea
                label="Additional Notes"
                placeholder="Add delivery details, deadlines, or special requests..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                fullWidth
                rows={4}
              />
            </div>

            {/* WhatsApp Quote Button */}
            <Button
              onClick={handleSendQuote}
              size="lg"
              className="w-full bg-[#e84e1b] hover:bg-[#e84e1b] flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Pedir Presupuesto por WhatsApp</span>
            </Button>

            <p className="text-xs text-gray-500 text-center mt-3">
              Esto abrirá WhatsApp con un mensaje precargado con los detalles de tu presupuesto.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};
