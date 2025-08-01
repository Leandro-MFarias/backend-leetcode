import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function auth(req, res, next) {
  const token = req.cookies.accessToken

  if (!token) {
    return res.status(401).json({ message: "Acesso Negado middleware" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.userId = decoded.id
    next()
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" })
  }
}