import express from "express";
import { loginController, signUpController } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/register", signUpController);

export default router;
