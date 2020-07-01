import express from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
import Joi from '@hapi/joi'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

const registerValidateSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6)
})

const loginValidateSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6)
})

const updateValidateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(6)
})

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

const errorHandler = error => {
  switch (error) {
    case '"name" is not allowed to be empty':
      return 'Поле имя не должно быть пустым'
    case '"email" is not allowed to be empty':
      return 'Поле почта не должно быть пустым'
    case '"password" is not allowed to be empty':
      return 'Поле пароль не должно быть пустым'
    case '"email" must be a valid email':
      return 'Введите корректную почту'
    case '"password" length must be at least 6 characters long':
      return 'Пароль должен содержать минимум 6 символов'
  }
}

router.post('/register', async (req, res) => {
  const { error } = registerValidateSchema.validate(req.body)

  if (error) return res.status(400).send(errorHandler(error.details[0].message))

  const emailExists = await User.findOne({ email: req.body.email })
  if (emailExists) return res.status(400).send('Пользователь с такой почтой уже существует')

  const hashedPassword = await bcrypt.hash(req.body.password, 10)

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    status: 'client'
  })

  try {
    const savedUser = await user.save()

    const token = jwt.sign({ _id: user._id, status: user.status }, process.env.SECRET, { expiresIn: '7d' })

    res.send({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      status: savedUser.status,
      token
    })
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post('/login', async (req, res) => {
  const { error } = loginValidateSchema.validate(req.body)

  if (error) return res.status(400).send(errorHandler(error.details[0].message))

  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).json('Пользователя с такой почтой не существует')

  const validatePassword = await bcrypt.compare(req.body.password, user.password)
  if (!validatePassword) return res.status(400).json('Неправильный пароль')

  try {
    const token = jwt.sign({ _id: user._id, status: user.status }, process.env.SECRET, { expiresIn: '7d' })

    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      status: user.status,
      token
    })
  } catch (error) {
    res.status(400).send(error)
  }
})


router.put('/:id', verify, async (req, res) => {
  const id = req.params.id

  const user = await User.findById(id)

  if (user) {
    const { error } = updateValidateSchema.validate(req.body)

    if (error) return res.status(400).send(errorHandler(error.details[0].message))

    const hashedPassword = req.body.password ? await bcrypt.hash(req.body.password, 10) : user.password

    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.password = hashedPassword

    try {
      const updatedUser = await user.save()

      const token = jwt.sign({ _id: user._id, status: user.status }, process.env.SECRET, { expiresIn: '7d' })

      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        status: updatedUser.status,
        token
      })
    } catch (error) {
      res.status(400).send('Пользователь с такой почтой уже существует')
    }
  } else {
    res.status(400).send('Произошла ошибка')
  }
})

export default router