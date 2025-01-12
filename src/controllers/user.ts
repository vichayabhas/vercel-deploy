import { sendingEmail, sendRes } from "./setup";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { VerifyEmail } from "../models/interface";
const buf = "ertyhjhgfdrtyujhgftyuikjhgfvgtyui";
export function checkValidStudentEmail(input: string) {
  const id = input.split("@")[0];
  return (
    input.split("@")[1] == "student.chula.ac.th" &&
    id[8] == "2" &&
    id[9] == "1" &&
    id.length == 10 &&
    id[0] == "6"
  );
}
export async function signId(req: express.Request, res: express.Response) {
  const { email } = req.body;

  if (!checkValidStudentEmail(email)) {
    sendRes(res, false);
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const text = await bcrypt.hash(email, salt);
  sendingEmail(email, jwt.sign({ password: text }, buf));
  sendRes(res, true);
}
export async function verifyEmail(req: express.Request, res: express.Response) {
  const input: VerifyEmail = req.body;
  if (!checkValidStudentEmail(input.email)) {
    sendRes(res, false);
    return;
  }
  try {
    const { password } = jwt.verify(input.token, buf) as {
      password: string;
    };
    const correct = await bcrypt.compare(input.email, password);
    if (!correct) {
      sendRes(res, false);
      return;
    }
    sendRes(res, true);
  } catch (error) {
    console.error(error);
    sendRes(res, false);
  }
}
