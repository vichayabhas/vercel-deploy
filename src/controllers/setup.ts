import {
  SystemInfo,
} from "../models/interface";
import express from 'express'
export const userPath = "api/v1/auth";


import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";

export function sendingEmail(email: string, text: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "arifmini64@gmail.com",
      pass: "mtekbmbboehothcy",
    },
  });
  const mailOptions: MailOptions = {
    from: "arifmini64@gmail.com",
    to: email,
    subject: "verify email",
    text,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email sending failed:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
export function getSystemMode() {
  return process.env.MODE;
}
export function getEndEmail() {
  return process.env.END_EMAIL;
}

export function getSystemInfoRaw(): SystemInfo {
  const systemMode = getSystemMode() || "";
  const endEmail = getEndEmail() || "student.chula.ac.th";
  const studentIdLastTwoDigit = process.env.LAST_TWO_DIGIT || "21";
  const studentIdLength = parseInt(process.env.ID_LENGTH || "10");
  return {
    studentIdLastTwoDigit,
    endEmail,
    studentIdLength,
    systemMode,
    peeText: "pee",
    nongText: "nong",
    newText: "new",
    updateText: "update",
    manageText: "manage",
    questionText: "question",
    textQuestionText: "textQuestion",
    choiceQuestionText: "choiceQuestion",
    chatText: "chat",
  };
}
export function sendRes(res: express.Response, success: boolean) {
  res.status(success ? 200 : 400).json({ success });
}
