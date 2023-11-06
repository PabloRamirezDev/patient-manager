import nodemailer, { Transporter } from "nodemailer";
import { CONFIG } from "./config";

let mailer: Transporter;

export const getMailer = () => {
  if (mailer) return mailer;

  mailer = nodemailer.createTransport({
    host: CONFIG.MAILER_HOST,
    port: CONFIG.MAILER_PORT,
    auth: {
      user: CONFIG.MAILER_USER,
      pass: CONFIG.MAILER_PASSWORD,
    },
  });

  return mailer;
};
