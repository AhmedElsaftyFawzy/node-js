import express from "express"
import productRouter from "./routes/products.js"
import mongoose from "mongoose"
import env from "dotenv"
import { MongoClient } from "mongodb"

const app = express()
app.use(express.json())
env.config()

mongoose
  .connect(process.env.MONGODB_URI)
  .then((client) => {
    console.log("connection established")
  })
  .catch((error) => {
    console.log(error)
  })

app.use("/api/products", productRouter)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
