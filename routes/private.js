import express from "express";
import { logoutSession } from "../utils/jwt.js";
import { listExercise } from "./listExercise.js";
import { getUserInfo } from "./user.js";
import { createExercise } from "../controllers/createExercise.js";
import { getExercise } from "./getExercise.js";
import { submitExercise } from "../controllers/submitExercise.js"
import { responseJudge } from "./responseJudge.js";

const router = express.Router();

router.post("/logout", logoutSession);

router.get("/listExercise", listExercise);

router.get("/user", getUserInfo)

router.post("/createExercise", createExercise)

router.get("/exercise/:id", getExercise)

router.post("/submission", submitExercise)

router.get("/submission/:token", responseJudge)

export default router;
