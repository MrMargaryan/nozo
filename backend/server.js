import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'path'
import userRoute from './routes/userRoute.js'
import orderRoute from './routes/orderRoute.js'
import productRoute from './routes/productRoute.js'

dotenv.config()

const mongodbUrl = process.env.MONGODB_URI || 'mongodb+srv://hamlet:hamlet12345@cluster0-uegsu.azure.mongodb.net/nozo?retryWrites=true&w=majority'
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(error => console.log(error))

const app = express()

app.use('/uploads', express.static('uploads'))

app.use(express.json())

app.use(cors())

app.use('/api/user', userRoute)

app.use('/api/orders', orderRoute)

app.use('/api/products', productRoute)

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve()

  app.use('/static', express.static(path.join(__dirname, 'frontend/build/static')))

  app.get('*', (req, res) => {
    res.sendFile(__dirname + '/frontend/build/index.html')
  })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))
