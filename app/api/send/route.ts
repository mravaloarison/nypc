import { NextRequest } from 'next/server';
import { EmailTemplate } from '../../../components/email/email_template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const reqData = await req.json();
  const passageRef = reqData.passageRef;
  const passage = reqData.passage;
  const heading = 'Jehoram Reigns in Judah';
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'Quote of the Day <admin@mravaloarison.tech>',
      to: ['mravaloarison@gmail.com'],
      subject: heading,
      react: EmailTemplate({ scripturePsg: passage, scriptureRef: passageRef }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
