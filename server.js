import express from "express";
import publicRoutes from "./routes/public.js";
import privateRoutes from "./routes/private.js";

import cors from "cors";

import { auth } from "./middlewares/auth.js";
import cookieParser from "cookie-parser";

const allowedOrigins = [
  "http://localhost:3000",
  "https://maisprati-leetcode.vercel.app",
];

const PORT = process.env.PORT || 3333
const app = express();
app.use(express.json());

app.use(
  cors({ origin: allowedOrigins, credentials: true })
);

app.use(cookieParser());

app.use("/", publicRoutes);
app.use("/", auth, privateRoutes);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));