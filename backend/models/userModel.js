import mongoose from 'mongoose'

const userShema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'client'
  }
})

const userModel = mongoose.model('User', userShema)

export default userModel