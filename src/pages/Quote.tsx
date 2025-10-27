import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus, MessageCircle, FileText } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { Textarea } from '../components/ui/Textarea';
import { useCart } from '../store/CartContext';
import { useWhatsAppMessage } from '../hooks/useWhatsAppMessage';
import jsPDF from 'jspdf';

/** Genera un PDF con el detalle del presupuesto */
function createQuotePdfBlob(
  items: Array<{ name: string; sku: string; quantity: number }>,
  notes: string
): { blob: Blob; filename: string } {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('Solicitud de Presupuesto - Geneve', 14, 18);
  doc.setFontSize(12);
  let y = 28;

  doc.text('Productos:', 14, y);
  y += 8;
  items.forEach((it, idx) => {
    const line = `${idx + 1}. ${it.name} | SKU: ${it.sku} | Cantidad: ${it.quantity}`;
    const lines = doc.splitTextToSize(line, 180);
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
    doc.text(lines, 14, y);
    y += 8;
  });

  if (notes.trim()) {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
    doc.setFont(undefined, 'bold');
    doc.text('Notas del cliente:', 14, y);
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
      alert('Por favor agregá productos al presupuesto antes de enviarlo.');
      return;
    }

    // 1️⃣ Crear PDF del presupuesto
    const { blob, filename } = createQuotePdfBlob(
      items.map(i => ({ name: i.name, sku: i.sku, quantity: i.quantity })),
      notes
    );

    // 2️⃣ Intentar compartir o descargar PDF
    try {
      const file = new File([blob], filename, { type: 'application/pdf' });
      // @ts-ignore
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        // @ts-ignore
        await navigator.share({
          files: [file],
          text: 'Hola Geneve, te envío mi solicitud de presupuesto.',
          title: 'Solicitud de Presupuesto',
        });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (e) {
      console.warn('Error al compartir o descargar PDF:', e);
    }

    // 3️⃣ Abrir WhatsApp con productos
    sendQuote({ items, notes });
  };

  const totalItems = getTotalItems();

  if (items.length === 0) {
    return (
      <div className="max-h-screen bg-gray-50">
        <Container className="py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">No hay productos seleccionados</h1>
          <p className="text-lg text-gray-600 mb-8">
            Empezá agregando productos del catálogo para solicitar un presupuesto.
          </p>
          <Button as={Link} to="/catalog" size="lg" className="font-heading">
            Ver Catálogo
          </Button>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 text-[#e84e1b] font-bold hover:text-[#cf4700]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al Catálogo</span>
            </Link>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2">
              Solicitud de Presupuesto
            </h1>
            <p className="text-lg text-gray-600 mt-1">
              {totalItems} producto{totalItems !== 1 ? 's' : ''} en tu presupuesto
            </p>
          </div>

          {items.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
            >
              Borrar Todo
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-24 h-48 sm:h-24 bg-gray-100 rounded-lg overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">SKU: {item.sku}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-700">Cantidad:</span>
                        <div className="flex items-center border rounded-lg">
                          <button
                            onClick={() => decrementItem(item.id)}
                            className="p-2 hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4">{item.quantity}</span>
                          <button
                            onClick={() => incrementItem(item.id)}
                            className="p-2 hover:bg-gray-100"
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

          <div className="bg-white rounded-2xl border p-6 h-fit sticky top-24 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Resumen de Productos
            </h2>

            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between text-gray-700">
                <span>Total de Productos:</span>
                <span className="font-medium">{totalItems}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Líneas de Productos:</span>
                <span className="font-medium">{items.length}</span>
              </div>
            </div>

            <div className="border-t pt-6 mb-6">
              <Textarea
                label="Notas adicionales"
                placeholder="Agregá detalles, fechas o requisitos especiales..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                fullWidth
                rows={4}
              />
            </div>

            <Button
              onClick={handleSendQuote}
              size="lg"
              className="w-full bg-[#e84e1b] hover:bg-[#d14a19] flex items-center justify-center space-x-2 font-heading"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Enviar Presupuesto por WhatsApp</span>
            </Button>

            <p className="text-xs text-gray-500 text-center mt-3">
              Se abrirá WhatsApp con el detalle de tus productos listos para enviar.
              Haz doble click para abrir WhatsApp con tu presupuesto. 
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};
