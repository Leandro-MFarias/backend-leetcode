import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const isProduction = process.env.NODE_ENV === "production";

export function generateAcessToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function createSessionCookies(res, user) {
  console.log("Criando cookies de sessão para:", user.email);
  const accessToken = generateAcessToken(user);
  const refreshToken = generateAcessToken(user);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: isProduction ? "None" : "Lax",
    secure: isProduction,
    path: "/",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: isProduction ? "None" : "Lax",
    secure: isProduction,
    path: "/",
  });
}

export function logoutSession(req, res) {
  res.cookie("accessToken", null, {
    httpOnly: true,
    sameSite: isProduction ? "None" : "Lax",
    secure: isProduction,
    path: "/",
    maxAge: 0,
  })

  res.cookie("refreshToken", null, {
    httpOnly: true,
    sameSite: isProduction ? "None" : "Lax",
    secure: isProduction,
    path: "/",
    maxAge: 0,
  })

  res.status(200).json({ message: "Logout feito com sucesso!" })
}
