import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import Mail from 'nodemailer/lib/mailer';

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    },
} as SMTPTransport.Options);

type SendEmailDto = {
    sender: Mail.Address,
    recipient: Mail.Address,
    subject: string,
    message: string
}

export const sendEmail = async (dto: SendEmailDto) => {
    const { sender, recipient, subject, message } = dto;

    return await transporter.sendMail({
        from: sender,
        to: recipient,
        subject,
        html: message,
        text: message
    });
}