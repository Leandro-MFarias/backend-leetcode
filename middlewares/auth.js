import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function auth(req, res, next) {
  const token = req.cookies.accessToken
  console.log("Token recebido: ", token);

  if (!token) {
    return res.status(401).json({ message: "Acesso Negado" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.userId = decoded.id
    next()
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" })
  }
}