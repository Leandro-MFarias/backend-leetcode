import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken" 

const JWT_SECRET = process.env.JWT_SECRET
const prisma = new PrismaClient()

export async function getUserInfo(req, res) {
  const token = req.cookies.accessToken

  if (!token) {
    return res.status(401).json({ message: "Não autorizado" })
  }

  const decoded = jwt.verify(token, JWT_SECRET)

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      progress: true,
    }
  })

  res.status(200).json(user)
}