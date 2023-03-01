import nodemailer from 'nodemailer';

/*
  Configuration of the SMTP server using node-mailer.
*/
const transporter = nodemailer.createTransport({
  host: 'smtp.elasticemail.com',
  port: 2525,
  secure: false,
  auth: {
    user: process.env.NEXT_PUBLIC_STMP_USERNAME,
    pass: process.env.NEXT_PUBLIC_STMP_PASSWORD,
  },
});

export default transporter;
