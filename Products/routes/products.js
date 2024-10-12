import Product from "./../models/Product.js"
import express from "express"

const router = express.Router()

// Get all products

router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

// Get single product

router.get("/products", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: "Product not found" })
    res.json(product)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

// Add new product

router.post("/products", async (req, res) => {
  const { name, price, description, quantity, category } = req.body

  try {
    const newProduct = new Product({
      name,
      price,
      description,
      quantity,
      category,
    })
    await newProduct.save()
    res.json({ message: "Product saved successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

// delete product

router.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: "Product not found" })
    await product.deleteOne()
    res.json({ message: "Product deleted successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

export default router
