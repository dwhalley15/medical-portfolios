/**
 * @file Email Service
 * @description This file handles email sending functionality using Nodemailer, including SMTP configuration and sending emails.
 */

import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import Mail from "nodemailer/lib/mailer";

/**
 * Configures the Nodemailer transporter for sending emails.
 * Uses SMTP settings from environment variables.
 */
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
} as SMTPTransport.Options);

/**
 * Defines the structure for email details.
 * @typedef {Object} SendEmailDto
 * @property {Mail.Address} sender - The sender's email address.
 * @property {Mail.Address} recipient - The recipient's email address.
 * @property {string} subject - The email subject.
 * @property {string} message - The email body (HTML or plain text).
 */
type SendEmailDto = {
  sender: Mail.Address;
  recipient: Mail.Address;
  subject: string;
  message: string;
};

/**
 * Sends an email using the configured Nodemailer transporter.
 * @param {SendEmailDto} dto - The email details including sender, recipient, subject, and message.
 * @returns {Promise<Object>} The result of the email sending operation.
 */
export const sendEmail = async (dto: SendEmailDto) => {
  const { sender, recipient, subject, message } = dto;

  return await transporter.sendMail({
    from: sender,
    to: recipient,
    subject,
    html: message,
    text: message,
  });
};
