// src/pages/Certifications.tsx
import React from 'react';
import { Download, Medal, ExternalLink } from 'lucide-react';
import { Container } from '../components/layout/Container';

const BRAND = '#e04f01';

const certificationsData = [
  {
    id: 'iso-9001',
    title: 'Certificado Seguridad Electrica Sensores de Movimiento',
    issuer: 'Este certificado acredita que el Sensor de Movimiento Geneve cumple con la norma IEC 60669-2-1 Ed. 4.2, con informe de ensayo ONE-08-20-7909, emitido por Lenor S.R.L..',
    validUntil: '2026-12-31',
    tags: ['Calidad', 'Procesos', 'Mejora continua'],
    documentUrl: '/docs/certifications/CERT-APROB-geneve.pdf',
    credentialUrl: undefined as string | undefined,
  },
  {
    id: 'iso-14001',
    title: 'Certificado Bomba Presurizadora',
    issuer: 'El presente certificado confirma que la Bomba Presurizadora Geneve cumple con la norma IEC 60335-2-41 Ed. 4.0, con informe de ensayo ONE-09-20-0478, emitido por Lenor S.R.L..',
    validUntil: '2026-06-30',
    tags: ['Sustentabilidad', 'Ambiente', 'Cumplimiento'],
    documentUrl: '/docs/certifications/certificacion-bombas-geneve.pdf',
    credentialUrl: undefined,
  },
  {
    id: 'iram-safety',
    title: 'Certificado Timer Digital',
    issuer: 'Este documento certifica que el Temporizador Digital Geneve (modelos GE-TD07M / GE-TD08D) cumple con IEC 60730-2-7: Ed. 2.0 (2008) y IEC 60730-1: Ed. 5.1 (2015), con informe de ensayo ONE-05-21-5460, emitido por Lenor S.R.L..',
    validUntil: '2025-09-15',
    tags: ['Seguridad', 'Mercado local', 'Eléctrico'],
    documentUrl: '/docs/certifications/CIERRE-APROB-TEMP-DIG.pdf',
    credentialUrl: undefined,
  },
  {
    id: 'electrical-safety',
    title: 'Certificado Timer Mecánico',
    issuer: 'El Temporizador Mecánico Geneve (modelos GE-TD02M / GE-TD03M / GE-TD01MRD) está certificado bajo IEC 60730-2-7: Ed. 2.0 (2008) y IEC 60730-1: Ed. 5.1 (2015), con informe de ensayo ONE-05-21-5461, emitido por Lenor S.R.L..',
    validUntil: '2025-11-20',
    tags: ['Seguridad', 'Instalación', 'Ensayos'],
    documentUrl: '/docs/certifications/CIERRE-APROB-TEMP-MEC.pdf',
    credentialUrl: undefined,
  },
  {
    id: 'construction-materials',
    title: 'Certificado Timer Rieldin',
    issuer: 'El Temporizador Riel DIN Geneve (modelos GE-TD15A / GE-TD15B / GE-TD15D / THC 15A) cumple con IEC 60730-2-7: Ed. 2.0 (2008) y IEC 60730-1: Ed. 5.1 (2015), con informe de ensayo ONE-08-21-3616, emitido por Lenor S.R.L..',
    validUntil: '2026-03-10',
    tags: ['Normativa', 'Durabilidad', 'Calidad'],
    documentUrl: '/docs/certifications/CERT-APROB-timer-rieldin.pdf',
    credentialUrl: undefined,
  },
  {
    id: 'ce-eu',
    title: 'Certificado Interruptor Smart',
    issuer: 'Este certificado valida que los Interruptores de Luz Smart Geneve (series GE-SS01P / GE-SS02P / GE-SS03P) cumplen con IEC 60669-2-1: 2015 (Ed. 4.2) y IEC 60669-1: 2007 (Ed. 3.2), con informe de ensayo ONE-01-25-1560, emitido por Lenor S.R.L..',
    validUntil: '2026-08-31',
    tags: ['Europa', 'Conformidad', 'Seguridad'],
    documentUrl: '/docs/certifications/07-LCS-4767-Certificado-Tipo-FIRMADO.pdf',
    credentialUrl: undefined,
  },
];

// util simple para estado
const getStatusPill = (isoDate: string) => {
  const now = new Date();
  const valid = new Date(isoDate) >= new Date(now.toDateString());
  return valid
    ? { label: 'Vigente', className: 'bg-emerald-50 text-emerald-700 ring-emerald-200' }
    : { label: 'Vencida', className: 'bg-gray-100 text-gray-700 ring-gray-200' };
};

export const Certifications: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-16">
        {/* Encabezado */}
<div className="mb-12">
  <div className="flex items-center justify-center gap-4">
    {/* Medalla al costado del título */}
    <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-sm ring-1 ring-orange-400/20"
         style={{ backgroundColor: '#e04f01' }}>
      <Medal className="w-7 h-7 text-white" strokeWidth={2.5} />
    </div>

    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
      Certificaciones & Estándares
    </h1>
  </div>

  <p className="mt-5 text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed text-center">
    Nuestro compromiso con la calidad y la seguridad está respaldado por certificaciones
    reconocidas en la industria y el cumplimiento de normas internacionales. Estas
    certificaciones garantizan que cada producto cumpla con los más altos requisitos de
    calidad y seguridad.
  </p>
</div>


        {/* Grid de tarjetas (2 filas x 3 columnas) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificationsData.map((cert) => {
            const status = getStatusPill(cert.validUntil);
            return (
              <article
                key={cert.id}
                className="group rounded-xl bg-white p-5 border border-gray-200 hover:shadow-md transition"
              >
                {/* Cabecera */}
                <div className="flex items-center gap-4">
                  {/* Logo/placeholder */}
                  

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 leading-tight truncate">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">{cert.issuer}</p>
                  </div>

                  {/* Estado */}
                  <span
                    className={`shrink-0 rounded-full text-xs px-2 py-1 ring-1 ${status.className}`}
                  >
                    {status.label}
                  </span>
                </div>

                {/* Tags */}
                {cert.tags?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {cert.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 ring-1 ring-gray-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}

                {/* Acciones */}
                <div className="mt-5 flex items-center gap-3">
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm inline-flex items-center gap-2 rounded-lg px-3 py-2 border border-gray-200 hover:bg-gray-50 transition"
                    >
                      {/* ícono abrir */}
                      <ExternalLink className="h-4 w-4" />
                      Ver credencial
                    </a>
                  )}

                  <a
                    href={cert.documentUrl}
                    download
                    className="ml-auto text-sm inline-flex items-center gap-2 rounded-lg px-3 py-2 border transition"
                    style={{
                      color: BRAND,
                      borderColor: `${BRAND}55`,
                      backgroundColor: `${BRAND}0D`, // ~6% opacity
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget.style.backgroundColor = `${BRAND}1A`); // ~10%
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget.style.backgroundColor = `${BRAND}0D`);
                    }}
                  >
                    <Download className="h-4 w-4" />
                    Descargar PDF
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="flex justify-center mt-10 border-[#e04f01]">
  <button
    onClick={() =>
      window.open(
        `https://wa.me/${import.meta.env.VITE_WHATSAPP_PHONE || '5491159278803'}?text=Hola Geneve, quisiera más información sobre sus certificaciones.`,
        '_blank'
      )
    }
    className="inline-flex items-center gap-2 rounded-lg border-2 border-[#e04f01] text-gray-900 px-6 py-3 text-lg font-semibold bg-white shadow-md hover:bg-[#e04f01]/10 transition"
  >
    Contactar por WhatsApp
  </button>
</div>





      </Container>
    </div>
  );
};
