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
  const term = req.query.term
    ? {
      name: {
        $regex: req.query.term,
        $options: 'i'
      }
    } : {}

  const brand = req.query.brand ? { brand: req.query.brand } : {}

  const sort = req.query.sort
    ? req.query.sort === 'lowest'
      ? { price: 1 }
      : { price: -1 }
    : { _id: -1 }

  const products = await Product.find({ ...term, ...brand }).sort(sort)
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

router.post('/review/:id', verify, async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    const review = {
      name: req.body.name,
      rating: req.body.rating,
      comment: req.body.comment
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating = Math.round(product.reviews.reduce((acc, review) => review.rating + acc, 0) / product.reviews.length)

    try {
      const updatedProduct = await product.save()
      res.send(updatedProduct.reviews[updatedProduct.reviews.length - 1])
    } catch (error) {
      res.status(400).send(error.message)
    }
  } else {
    res.status(400).send('Произошла ошибка')
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
      rating: 0,
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