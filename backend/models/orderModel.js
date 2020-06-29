import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
})

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [orderItemSchema],
  shipping: {
    type: String,
    required: true
  },
  payment: {
    type: String,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  isDelivered: {
    type: Boolean,
    required: true
  },
  deliveredAt: {
    type: Date
  }
}, { timestamps: true })

const orderModel = mongoose.model('Order', orderSchema)

export default orderModel