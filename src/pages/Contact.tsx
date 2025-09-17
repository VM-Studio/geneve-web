import React, { useState } from 'react';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { MessageSquare } from 'lucide-react';

export const Contact: React.FC = () => {
  // Datos de contacto (cambiá por los reales)
  const companyEmail = 'obras@geneve.com.ar';
  const whatsappNumber = '5491159278803'; // formato internacional

  // Estado del formulario
  const [nombre, setNombre] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tipo, setTipo] = useState('Residencial');
  const [plazo, setPlazo] = useState('Flexible');
  const [presupuesto, setPresupuesto] = useState('A definir');
  const [ubicacion, setUbicacion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [acepto, setAcepto] = useState(false);
  const [touched, setTouched] = useState<{[k: string]: boolean}>({});

  // Validaciones simples
  const errors = {
    nombre: !nombre ? 'Ingresá tu nombre' : '',
    email: !email
      ? 'Ingresá tu email'
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? 'Email no válido'
      : '',
    mensaje: !mensaje ? 'Escribí tu mensaje' : '',
    acepto: !acepto ? 'Debés aceptar ser contactado' : ''
  };
  const isInvalid = !!errors.nombre || !!errors.email || !!errors.mensaje || !!errors.acepto;

  const buildText = () =>
    `Consulta desde el sitio Web\n\n` +
    `Nombre: ${nombre}\n` +
    `Empresa: ${empresa}\n` +
    `Email: ${email}\n` +
    `Teléfono: ${telefono}\n` +
    `Tipo de proyecto: ${tipo}\n` +
    `Plazo: ${plazo}\n` +
    `Presupuesto: ${presupuesto}\n` +
    `Ubicación: ${ubicacion}\n\n` +
    `Mensaje:\n${mensaje}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ nombre: true, email: true, mensaje: true, acepto: true });
    if (isInvalid) return;

    const subject = 'Consulta / Solicitud de presupuesto';
    const body = buildText();
    window.location.href = `mailto:${companyEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleWhatsApp = () => {
    const text = buildText();
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <Container className="pt-12 pb-16">
        {/* Hero */}
        <header className="mb-10">
  {/* Badge alineado al margen izquierdo del layout */}
  <div className="container mx-auto px-4 lg:px-8">
    <span className="inline-flex items-center gap-2 rounded-full border border-[#e04f01]/20 bg-[#e04f01]/5 px-3 py-1 text-xs text-[#e04f01]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#e04f01]" />
      Respuesta en menos de 24 h
    </span>
  </div>

  {/* Bloque centrado para título y subtítulo */}
  <div className="max-w-3xl mx-auto text-center">
    <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900">
      Pedí tu <span className="text-[#e04f01]">presupuesto</span> a medida
    </h1>
    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
      Obtené precios personalizados y recomendaciones de nuestros especialistas
      para asegurar el éxito de tu proyecto.
    </p>
  </div>
</header>




        {/* Contenido */}
        <main className="grid lg:grid-cols-5 gap-8">
          {/* Formulario */}
          <section className="lg:col-span-3">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-[#e04f01]" />
                  Contanos sobre tu proyecto
                </h2>
                <p className="mt-1.5 text-sm text-gray-600">
                  Completá el formulario y te contactamos a la brevedad.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="p-6 space-y-6">
                {/* Datos */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700">Nombre y apellido *</label>
                    <Input
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, nombre: true }))}
                      placeholder="Ej: Ana Pérez"
                      fullWidth
                      className="mt-2 focus:ring-2 focus:ring-[#e04f01]/30 focus:border-[#e04f01]"
                    />
                    {touched.nombre && errors.nombre && (
                      <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Empresa (opcional)</label>
                    <Input
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
                      placeholder="Ej: Constructora XYZ"
                      fullWidth
                      className="mt-2 focus:ring-2 focus:ring-[#e04f01]/30 focus:border-[#e04f01]"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700">Email *</label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                      placeholder="nombre@empresa.com"
                      fullWidth
                      className="mt-2 focus:ring-2 focus:ring-[#e04f01]/30 focus:border-[#e04f01]"
                    />
                    {touched.email && errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Teléfono</label>
                    <Input
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="+54 11 5555 5555"
                      fullWidth
                      className="mt-2 focus:ring-2 focus:ring-[#e04f01]/30 focus:border-[#e04f01]"
                    />
                  </div>
                </div>

                {/* Proyecto */}
                <div className="grid sm:grid-cols-2 gap-4">
                  
                  
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  
                  <div>
                    <label className="block text-sm text-gray-700">Ubicación</label>
                    <Input
                      value={ubicacion}
                      onChange={(e) => setUbicacion(e.target.value)}
                      placeholder="Ciudad / Provincia"
                      fullWidth
                      className="mt-2 focus:ring-2 focus:ring-[#e04f01]/30 focus:border-[#e04f01]"
                    />
                  </div>
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-sm text-gray-700">Detalles del proyecto *</label>
                  <Textarea
                    rows={5}
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, mensaje: true }))}
                    placeholder="Contanos alcances, superficies, marcas sugeridas o cualquier info relevante…"
                    fullWidth
                    className="mt-2 focus:ring-2 focus:ring-[#e04f01]/30 focus:border-[#e04f01]"
                  />
                  {touched.mensaje && errors.mensaje && (
                    <p className="mt-1 text-sm text-red-600">{errors.mensaje}</p>
                  )}
                </div>

                {/* Adjunto + cómo nos conociste */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700">Adjuntar archivos (opcional)</label>
                    <label
                      htmlFor="archivo"
                      className="mt-2 flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 hover:border-[#e04f01]/40"
                    >
                      Subir PDF, JPG, PNG… (máx. 10 MB)
                    </label>
                    <input id="archivo" name="archivo" type="file" className="sr-only" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">¿Cómo nos conociste?</label>
                    <select
                      className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-[#e04f01] focus:ring-2 focus:ring-[#e04f01]/30"
                    >
                      <option>Recomendación</option>
                      <option>Búsqueda en Google</option>
                      <option>Redes sociales</option>
                      <option>Obra / Local</option>
                    </select>
                  </div>
                </div>

                {/* Consentimiento */}
                <div className="flex items-start gap-3">
                  <input
                    id="acepto"
                    type="checkbox"
                    checked={acepto}
                    onChange={(e) => setAcepto(e.target.checked)}
                    onBlur={() => setTouched((t) => ({ ...t, acepto: true }))}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[#e04f01] focus:ring-[#e04f01]/40"
                  />
                  <label htmlFor="acepto" className="text-sm text-gray-700">
                    Acepto ser contactado por el equipo de Geneve y la política de privacidad.
                  </label>
                </div>
                {touched.acepto && errors.acepto && (
                  <p className="text-sm text-[#e04f01] -mt-2">{errors.acepto}</p>
                )}

                {/* Botones */}
                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <Button type="submit" size="lg" className="w-full sm:w-auto bg-[#e04f01]">
                    Solicitar presupuesto
                  </Button>
                  <Button
  type="button"
  variant="outline"
  size="lg"
  onClick={handleWhatsApp}
  className="w-full sm:w-auto border-2 border-[#e04f01] text-[#e04f01] hover:bg-[#e04f01]/10 focus:ring-2 focus:ring-[#e04f01]/30"
>
  Enviar por WhatsApp
</Button>

                </div>

                <p className="text-xs text-gray-500">
                  Tiempo de respuesta promedio: <span className="text-gray-700">menos de 24 h</span>
                </p>
              </form>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold text-gray-900">¿Por qué pedirlo con nosotros?</h3>
              <ul className="mt-4 space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#e04f01]"></span>
                  Precios personalizados según volumen y plazos.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#e04f01]"></span>
                  Asesoramiento técnico por especialistas.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#e04f01]"></span>
                  Productos certificados y garantía oficial.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#e04f01]"></span>
                  Entregas a todo el país.
                </li>
              </ul>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center">
                  <div className="text-lg font-semibold text-gray-900">+2.5k</div>
                  <div className="text-[11px] text-gray-600">clientes</div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center">
                  <div className="text-lg font-semibold text-gray-900">+40</div>
                  <div className="text-[11px] text-gray-600">años</div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center">
                  <div className="text-lg font-semibold text-gray-900">24 h</div>
                  <div className="text-[11px] text-gray-600">respuesta</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold text-gray-900">¿Preferís hablar con alguien?</h3>
              <p className="mt-2 text-sm text-gray-700">
                Escribinos por WhatsApp o llamanos de Lunes a Viernes de 9 a 18 h.
              </p>

              <div className="mt-4 grid sm:grid-cols-2 gap-3">
              <button
  onClick={handleWhatsApp}
  className="inline-flex items-center justify-center gap-2 rounded-xl  border-[#e04f01] text-[#e04f01] px-5 py-2.5 text-sm font-medium hover:bg-[#e04f01]/10 focus:ring-2 focus:ring-[#e04f01]/30 transition"
>
  WhatsApp
</button>

                <a
                  href={`mailto:${companyEmail}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm hover:bg-gray-50"
                >
                  Email
                </a>
              </div>

              <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm">
                <div className="text-gray-600">Teléfono</div>
                <div className="font-medium text-gray-900">+54 9 1159278803</div>
                
              </div>
            </div>
          </aside>
        </main>
      </Container>
    </div>
  );
};

export default Contact;
