import React, { useState } from 'react';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { useNavigate } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { track, sendAdsConversion } from '../analytics/track';

export const Contact: React.FC = () => {
  const navigate = useNavigate();

  // Estado del formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [acepto, setAcepto] = useState(false);
  const [touched, setTouched] = useState<{ [k: string]: boolean }>({});
  const [sending, setSending] = useState(false);

  // Validaciones simples
  const errors = {
    nombre: !nombre ? 'Ingresá tu nombre' : '',
    email: !email
      ? 'Ingresá tu email'
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? 'Email no válido'
      : '',
    mensaje: !mensaje ? 'Escribí tu mensaje' : '',
    acepto: !acepto ? 'Debés aceptar ser contactado' : '',
  };
  const isInvalid =
    !!errors.nombre || !!errors.email || !!errors.mensaje || !!errors.acepto;

  // Envío con Resend API
  const sendEmail = async () => {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre,
        email,
        telefono,
        mensaje,
      }),
    });

    if (!response.ok) {
      throw new Error('Error al enviar el email');
    }

    const data = await response.json();
    return data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ nombre: true, email: true, mensaje: true, acepto: true });
    if (isInvalid || sending) return;

    // Métrica: clic al botón
    track('click_presupuesto', { page: 'contact', source: 'form' });

    setSending(true);
    try {
      await sendEmail();

      // Métrica de éxito
      track('presupuesto_success', {
        method: 'resend',
        path: window.location.pathname,
      });

      // ✅ Disparo de CONVERSIÓN de Google Ads (evento)
      sendAdsConversion('AW-17635295323/4TkRCNSqvqkbENuAIdlB', {
        value: 1.0,
        currency: 'ARS',
      });

      // Redirección a página de agradecimiento
      navigate('/agradecimiento', { replace: true });
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      track('presupuesto_error', { path: window.location.pathname });
      alert('Hubo un error al enviar el mensaje. Por favor, intentá nuevamente.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Seo
        title="Contacto | Geneve"
        description="Pedí tu presupuesto a medida. Respondemos en menos de 24 h."
        canonical="https://www.geneveobras.com/contact"
      />
      <div className="min-h-screen bg-white">
        <Container className="pt-12 pb-16">
          {/* Hero */}
          <header className="mb-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
                Pedí tu presupuesto
              </h1>
            </div>
          </header>

          {/* Contenido */}
          <main className="max-w-2xl mx-auto">
            {/* Formulario centrado */}
            <div className="rounded-lg border border-gray-200 bg-white p-8">
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo *</label>
                  <Input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, nombre: true }))}
                    placeholder="Tu nombre"
                    fullWidth
                    className="focus:ring-2 focus:ring-[#e67a5d]/30 focus:border-[#e67a5d]"
                  />
                  {touched.nombre && errors.nombre && (
                    <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    placeholder="tu@email.com"
                    fullWidth
                    className="focus:ring-2 focus:ring-[#e67a5d]/30 focus:border-[#e67a5d]"
                  />
                  {touched.email && errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono (opcional)</label>
                  <Input
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="+54 11 1234 5678"
                    fullWidth
                    className="focus:ring-2 focus:ring-[#e67a5d]/30 focus:border-[#e67a5d]"
                  />
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje *</label>
                  <Textarea
                    rows={6}
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, mensaje: true }))}
                    placeholder="Contanos qué necesitás..."
                    fullWidth
                    className="focus:ring-2 focus:ring-[#e67a5d]/30 focus:border-[#e67a5d]"
                  />
                  {touched.mensaje && errors.mensaje && (
                    <p className="mt-1 text-sm text-red-600">{errors.mensaje}</p>
                  )}
                </div>

                {/* Consentimiento */}
                <div className="flex items-start gap-3">
                  <input
                    id="acepto"
                    type="checkbox"
                    checked={acepto}
                    onChange={(e) => setAcepto(e.target.checked)}
                    onBlur={() => setTouched((t) => ({ ...t, acepto: true }))}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[#e67a5d] focus:ring-[#e67a5d]/40"
                  />
                  <label htmlFor="acepto" className="text-sm text-gray-700">
                    Acepto ser contactado por el equipo de Geneve
                  </label>
                </div>
                {touched.acepto && errors.acepto && (
                  <p className="text-sm text-red-600 -mt-2">{errors.acepto}</p>
                )}

                {/* Botón de envío */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#e67a5d] hover:bg-[#e67a5d]/90 rounded-none"
                  disabled={sending}
                >
                  {sending ? 'Enviando…' : 'Enviar mensaje'}
                </Button>
              </form>
            </div>
          </main>
        </Container>
      </div>
    </>
  );
};

export default Contact;
