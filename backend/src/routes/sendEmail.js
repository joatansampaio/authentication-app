import { createTransport } from "nodemailer";
import { fileURLToPath } from "url";
import dotenv from 'dotenv';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../../.env');

const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error(result.error)
}

const user = process.env.USER;
const pass = process.env.PASS;

const transporter = createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user,
    pass,
  },
});

export const sendEmail = async ({ from, to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: from,
      to: to,
      subject: subject,
      text: text,
      html: html,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
