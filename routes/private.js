import express from "express";
import { logoutSession } from "../utils/jwt.js";
import { listExercise } from "./listExercise.js";
import { getUserInfo } from "./user.js";


const router = express.Router();

router.post("/logout", logoutSession);

router.get("/listExercise", listExercise);

router.get("/user", getUserInfo)


export default router;
