import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

type Item = {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  image?: string;
};

export function buildQuotePdf(items: Item[], notes: string) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const now = new Date();
  const dateStr = now.toLocaleString();

  // Encabezado
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Solicitud de Presupuesto - GENEVE", 40, 50);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Fecha: ${dateStr}`, 40, 70);

  // Tabla de ítems
  const head = [["Producto", "SKU", "Cantidad"]];
  const body = items.map((it) => [it.name, it.sku || "-", String(it.quantity)]);

  autoTable(doc, {
    startY: 90,
    head,
    body,
    styles: { font: "helvetica", fontSize: 10, cellPadding: 6 },
    headStyles: { fillColor: [232, 78, 27] }, // #e84e1b
    alternateRowStyles: { fillColor: [248, 248, 248] },
    theme: "grid",
    columnStyles: { 0: { cellWidth: 300 }, 1: { cellWidth: 120 }, 2: { cellWidth: 80, halign: "right" } }
  });

  // Notas
  const afterTableY = (doc as any).lastAutoTable?.finalY || 90;
  if (notes?.trim()) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Notas del cliente:", 40, afterTableY + 30);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const split = doc.splitTextToSize(notes.trim(), 515);
    doc.text(split, 40, afterTableY + 48);
  }

  // Pie
  const pageH = doc.internal.pageSize.getHeight();
  doc.setDrawColor(232, 78, 27);
  doc.line(40, pageH - 60, doc.internal.pageSize.getWidth() - 40, pageH - 60);
  doc.setFontSize(9);
  doc.text("GENEVE · www.tu-sitio.com · contacto@tu-sitio.com · +54 9 11 1234-5678", 40, pageH - 40);

  // Devuelve Blob para poder compartir/descargar
  return doc.output("blob");
}
