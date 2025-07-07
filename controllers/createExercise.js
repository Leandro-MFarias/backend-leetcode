import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createExercise(req, res) {
  try {
    const {
      title,
      functionName,
      subtitle,
      description,
      functionSignature,
      exemple,
      testCases,
      newList,
      existingList,
    } = req.body;

    let listId;

    if (existingList) {
      const listExists = await prisma.listExercise.findUnique({
        where: { id: Number(existingList) },
        select: { id: true },
      });

      if (!listExists) {
        return res
          .status(400)
          .json({ message: "Lista existente não encontrada" });
      }

      listId = Number(existingList);
    } else if (newList) {
      const listName = newList.trim();

      const hasList = await prisma.listExercise.findUnique({
        where: { title: listName },
        select: { id: true },
      });

      if (hasList) {
        listId = hasList.id;
      } else {
        const newList = await prisma.listExercise.create({
          data: {
            title: listName,
          },
        });
        listId = newList.id;
      }
    } else {
      return res.status(400).json({ message: "Lista é necessária" });
    }

    await prisma.exercise.create({
      data: {
        title,
        functionName,
        subtitle,
        description,
        exemple,
        functionSignature,
        testCases,
        listaId: listId,
      },
    });

    return res.status(201).json({ message: "Exercício criado com sucesso!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro no servidor tente novamente mais tarde!" });
  }
}
