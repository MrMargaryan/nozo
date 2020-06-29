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

export default verify