import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_XyksrY3X_ASzCfa2NQ9EZZK51LU5jY9Rp');

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Solo aceptar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { nombre, email, telefono, mensaje } = req.body;

    // Validación básica
    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    // Enviar email con Resend
    const { data, error } = await resend.emails.send({
      from: 'Geneve Obras <onboarding@resend.dev>',
      to: ['obras@geneve.com.ar'],
      subject: `Nueva consulta de ${nombre}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e67a5d;">Nueva consulta desde el sitio web</h2>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${telefono || 'No proporcionado'}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Mensaje:</h3>
            <p style="line-height: 1.6; color: #666;">${mensaje.replace(/\n/g, '<br>')}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          
          <p style="color: #999; font-size: 12px;">
            Este mensaje fue enviado desde el formulario de contacto de www.geneveobras.com
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error in handler:', error);
    return res.status(500).json({ error: 'Error al enviar el email' });
  }
}
