import bcrypt from "bcryptjs";

import { PrismaClient } from "@prisma/client";
import { createSessionCookies, generateAcessToken } from "../utils/jwt.js";

const prisma = new PrismaClient();

// REGISTER
export async function signUpController(req, res) {
  try {
    const { name, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    // Verificar se email já existe mensagem de erro avisando
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({
        message: "Já existe usuário cadastrado com esse e-mail!",
      });
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashPassword,
      },
    });

    createSessionCookies(res, user);

    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
    });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor." });
  }
}

// LOGIN
export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      res.status(404).json({
        message: "Usuário não encontrado!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Senha inválida",
      });
    }

    // ACCESS TOKEN JWT
    createSessionCookies(res, user);

    return res.status(200).json({
      message: "Login realizado com sucesso!",
    });
  } catch (error) {
    res.status(500).json({ message: "Erro no Servidor, tente novamente" });
  }
}