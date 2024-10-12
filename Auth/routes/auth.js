import express from "express"
import env from "dotenv"
import JsonWebToken from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()
env.config()

// Register route

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const user = new User({ first_name, last_name, email, password })
    await user.save()

    const token = JsonWebToken.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })

    res.json({ token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

// Login route
router.get("/login", async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email }).select("+password")
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" })
    }
    const token = JsonWebToken.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })
    res.json({ token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})
