import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, eventName, date, message, surename } = await req.json();

    if (surename && surename.length > 0) {
      console.log("BOT DETECTADO: Intento de spam bloqueado.");
      return NextResponse.json({ success: true, message: "Processed" });
    }// Enviamos el correo
    const data = await resend.emails.send({
      from: 'Portfolio Araquelsh <onboarding@resend.dev>', // Luego podrás usar un dominio propio
      to: ['vongotsuna@gmail.com'], // Aquí va el correo real de la cosplayer
      subject: `[WEB] Nuevo contacto: ${eventName}`,
      html: `
        <div style="font-family: sans-serif; background: #1a1a1a; color: #fff; padding: 20px; border-radius: 10px;">
          <h2 style="color: #a050ff;">¡Nueva propuesta de trabajo!</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Evento:</strong> ${eventName}</p>
          <p><strong>Fecha sugerida:</strong> ${date || 'No especificada'}</p>
          <hr style="border-color: #333;" />
          <p><strong>Mensaje:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error al enviar el mensaje' }, { status: 500 });
  }
}