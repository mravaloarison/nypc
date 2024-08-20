import { EmailTemplate } from '../../../components/email/email_template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'NYPC <onboarding@resend.dev>',
      to: ['mravaloarison@gmail.com'],
      subject: 'Hello world',
      react: EmailTemplate({ firstName: 'Rava' }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
