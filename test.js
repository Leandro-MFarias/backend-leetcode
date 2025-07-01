import express from "express"

const router = express.Router()

router.get("/test", (req, res) => {
  console.log("Cookies recebidos ", req.cookies);
  res.status(200).json({ message: "RECEBIDOO" })
})

export default router