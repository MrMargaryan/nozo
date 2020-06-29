import express from 'express'
import Product from '../models/productModel'
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

const isAdmin = (req, res, next) => {
  if (req.user && req.user.status === 'admin')
    return next()

  return res.status(400).send('Ошбика доступа')
}

const router = express.Router()

router.get('/', async (req, res) => {
  const products = await Product.find()
  res.send(products)
})

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id })
    res.send(product)
  } catch (error) {
    res.status(404).send('Товар не найден')
  }
})

router.post('/', verify, isAdmin, async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      countInStock: req.body.countInStock,
      description: req.body.description,
      numReviews: 0
    })

    const newProduct = await product.save()

    res.send(newProduct)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.put('/:id', verify, isAdmin, async (req, res) => {
  const id = req.params.id

  const product = await Product.findById(id)

  if (product) {
    product.name = req.body.name
    product.image = req.body.image
    product.brand = req.body.brand
    product.price = req.body.price
    product.countInStock = req.body.countInStock
    product.description = req.body.description

    try {
      const newProduct = await product.save()

      res.send(newProduct)
    } catch (error) {
      res.status(400).send(error.message)
    }
  } else {
    res.status(400).send('Произошла ошибка')
  }
})

router.delete('/:id', verify, isAdmin, async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id)

  if (deletedProduct) {
    await deletedProduct.remove()
    res.send('Товар удален')
  } else {
    res.status(400).send('Ошибка в удалении товара')
  }
})

export default router