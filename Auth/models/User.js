import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please enter a first_name"],
  },
  last_name: {
    type: String,
    required: [true, "Please enter a last_name"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false, // Do not return password by default
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model("User", userSchema)
export default User
