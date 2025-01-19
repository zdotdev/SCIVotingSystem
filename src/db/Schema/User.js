import mongoose from 'mongoose'

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
    studentId: { type: String, required: true, trim: true, unique: true },
    studentCourse: { type: String, required: true, trim: true },
    role: { type: String, default: 'newUser' },
    refreshToken: { type: String, required: true }
  },
  { timestamps: true }
)

const User = mongoose.model('user', userSchema)

export default User