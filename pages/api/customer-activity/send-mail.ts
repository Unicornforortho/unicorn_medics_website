import type { NextApiRequest, NextApiResponse } from 'next';
import transporter from '../../../config/node-mailer-config';

/*
  Sends mail with the help of node-mailer configuration
  For more details visit : https://documenter.getpostman.com/view/16629391/2s93CRLBzC
*/

function generateEmailBody(name: string, email: string, message: string) {
  return `
    <h2>Name: ${name}</h2>
    <h3>Email: ${email}</h3>
    <h4>Message: ${message}</h4>
  `;
}

function generateEmailSubject(name: string, subject: string) {
  return `${name} - ${subject}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { from, to, subject, text, senderEmail, senderName } = req.body;
      const response = await transporter.sendMail({
        from,
        to,
        subject: generateEmailSubject(senderName, subject),
        html: generateEmailBody(senderName, senderEmail, text),
      });
      res.status(200).json({
        error: false,
        response,
      });
    } catch (err) {
      res.status(400).json({
        error: true,
        errorMessage: err,
        message: 'Bad request',
      });
    }
  } else {
    res.status(405).json({
      error: true,
      message: 'Method not allowed',
    });
  }
}
