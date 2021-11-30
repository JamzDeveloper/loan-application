import { Router } from "express";
import { postLogin } from "../controllers/auth";
import {check } from "express-validator";
const router = Router();

router.post('/login',postLogin);

export default router;
