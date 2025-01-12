import express from "express";
import {
  signId,
  verifyEmail,
} from "../controllers/user";
import { sendRes } from "../controllers/setup";

const router = express.Router();


router.post("/signId/", signId); //
router.post("/verifyEmail/", verifyEmail); //
router.get('/test/',(req,res)=>{sendRes(res,true)})
export default router;
