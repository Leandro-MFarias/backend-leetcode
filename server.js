import express from "express"
import publicRoutes from "./routes/public.js"
import privateRoutes from "./routes/private.js"
import cors from "cors"

import { auth } from "./middlewares/auth.js"
import cookieParser from "cookie-parser"

const app = express()
app.use(express.json())
app.use(cors({ origin: "http://localhost:3000", credentials: true}))

app.use(cookieParser())

app.use("/", publicRoutes)
app.use("/", auth, privateRoutes)

app.listen(3333, () => console.log("Servidor rodando.."))