import express from 'express'
import data from './data'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoute from './routes/userRoute'
import orderRoute from './routes/orderRoute'
import productRoute from './routes/productRoute'

dotenv.config()

// const mongodbUrl = process.env.DB
const mongodbUrl = 'mongodb+srv://hamlet:hamlet12345@cluster0-uegsu.azure.mongodb.net/nozo?retryWrites=true&w=majority'
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(error => console.log(error))

const app = express()

app.use(express.json())

app.use('/api/user', userRoute)

app.use('/api/orders', orderRoute)

app.use('/api/products', productRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))
