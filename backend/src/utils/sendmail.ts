import nodemailer from "nodemailer";
import { generateHtmlTemplate } from "./generateHTMLTemplate";
import dotenv from "dotenv";
dotenv.config();

const otp = Math.floor(Math.random() * 10000)
  .toString()
  .padStart(4, "0");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.ethereal.email",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
export const sendEmail = async (email: string, otp: string): Promise<void> => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: generateHtmlTemplate(otp), // html body
  });
};
