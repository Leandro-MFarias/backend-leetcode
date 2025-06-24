import express from "express";
import { PrismaClient } from "@prisma/client";
import { logoutSession } from "../utils/jwt.js";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const listExercises = await prisma.listExercise.findMany();

    res
      .status(200)
      .json({ message: "Dashboard acessado com Sucesso!!", listExercises });
  } catch (error) {
    res.status(500).json({ message: "Erro no Servidor" });
  }
});

router.post("/logout", logoutSession)

export default router