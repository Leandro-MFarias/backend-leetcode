import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function generateAcessToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function createSessionCookies(res, user) {
  const accessToken = generateAcessToken(user);
  const refreshToken = generateAcessToken(user);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "Lax",
    secure: false, // Colocar true em produção (https)
    path: "/",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "Lax",
    secure: false,
    path: "/",
  });
}

export function logoutSession(req, res) {
  res.cookie("accessToken", null, {
    httpOnly: true,
    secure: false,
    path: "/",
    sameSite: "Lax",
    maxAge: 0,
  })

  res.cookie("refreshToken", null, {
    httpOnly: true,
    secure: false,
    path: "/",
    sameSite: "Lax",
    maxAge: 0,
  })

  res.status(200).json({ message: "Logout feito com sucesso!" })
}
