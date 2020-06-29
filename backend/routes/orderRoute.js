import express from 'express'
import Order from '../models/orderModel'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const verify = (req, res, next) => {
  const token = req.header('token')

  if (!token) return res.status(401).send('Доступ закрыт')

  try {
    const verified = jwt.verify(token, process.env.SECRET)
    req.user = verified
    next()
  } catch (error) {
    return res.status(400).send('Неправильный токен')
  }
}

const router = express.Router()

router.post('/', verify, async (req, res) => {
  try {
    const newOrder = new Order({
      user: req.user._id,
      orderItems: [
        {
          name: "Nike"
        },
        {
          name: "Adidas"
        }
      ],
      shipping: req.body.shipping,
      payment: req.body.payment,
      totalPrice: req.body.totalPrice,
      isDelivered: false
    })

    const newOrderCreated = await newOrder.save()

    res.send(newOrderCreated)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

export default router
