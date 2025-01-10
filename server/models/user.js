const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      index: true
    },
    password: { type: String, required: true },
    image: { type: String, required: true },
    studentId: { type: String, required: true, trim: true, unique: true },
    role: { type: String, default: 'user' }
  },
  { timestamps: true }
)

module.exports = mongoose.model('user', userSchema)
