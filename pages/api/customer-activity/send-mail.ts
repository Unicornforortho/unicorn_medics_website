import type { NextApiRequest, NextApiResponse } from 'next';
import transporter from '../../../config/node-mailer-config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { from, to, subject, text } = req.body;
      const response = await transporter.sendMail({
        from,
        to,
        subject,
        text,
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
