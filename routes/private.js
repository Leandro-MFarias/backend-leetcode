import express from "express";
import { logoutSession } from "../utils/jwt.js";
import { listExercise } from "./listExercise.js";
import { getUserInfo } from "./user.js";
import { createExercise } from "../controllers/createExercise.js";
import { getExercise } from "./getExercise.js";

const router = express.Router();

router.post("/logout", logoutSession);

router.get("/listExercise", listExercise);

router.get("/user", getUserInfo)

router.post("/createExercise", createExercise)

router.get("/exercise/:id", getExercise)

export default router;
