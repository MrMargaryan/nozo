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

const isOperator = (req, res, next) => {
  if (req.user && req.user.status === 'operator')
    return next()

  return res.status(400).send('Ошбика доступа')
}

const router = express.Router()

router.post('/', verify, async (req, res) => {
  try {
    const newOrder = new Order({
      user: req.user._id,
      orderItems: req.body.orderItems,
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

router.get('/user', verify, async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.send(orders)
})

router.get('/all', verify, isOperator, async (req, res) => {
  const orders = await Order.find()
  res.send(orders)
})

router.put('/isDelivered', verify, isOperator, async (req, res) => {
  const order = await Order.findById(req.body.id)

  if (order) {
    order.isDelivered = req.body.isDelivered

    try {
      const newOrder = await order.save()
      res.send(newOrder)
    } catch (error) {
      res.status(400).send(error.message)
    }
  } else {
    res.status(400).send('Произошла ошибка')
  }
})

router.get('/:id', verify, async (req, res) => {
  const order = await Order.findById(req.params.id)
  res.send(order)
})


export default router
