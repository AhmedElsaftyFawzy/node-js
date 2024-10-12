import express from "express"
import mongoose from "mongoose"
import env from "dotenv"
import authRoutes from "./routes/auth.js"

env.config()

const app = express()

app.use(express.json())

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err))

app.use("/api/user", authRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
