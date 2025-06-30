import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listExercise(req, res) {
  try {
    const listExercises = await prisma.listExercise.findMany({
      select: {
        id: true,
        title: true,
        exercises: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    res
      .status(200)
      .json({ message: "Dashboard acessado com Sucesso!!", listExercises });
  } catch (error) {
    res.status(500).json({ message: "Erro no Servidor" });
  }
}