import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getExercise(req, res) {
  try {
    const exerciseId = req.params.id;

    const exercise = await prisma.exercise.findUnique({
      where: { id: Number(exerciseId) },
      select: {
        id: true,
        title: true,
        subtitle: true,
        description: true,
        functionSignature: true,
        exemple: true,
        testCases: true,
        lista: {
          select: {
            id: true,
            title: true,
          },
        },
        progress: true,
      },
    });

    if (!exercise)
      return res.status(404).json({ message: "Exercício não encontrado" });

    res.status(200).json(exercise);
  } catch (error) {
    console.log("Rota exercise/:id", error);
    res.status(500).json({ message: "Erro no servidor." });
  }
}
