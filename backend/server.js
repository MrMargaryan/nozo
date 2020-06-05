import express from 'express'
import data from './data'
// import config from 'config'
import mongoose from 'mongoose'
import userRoute from './routes/userRoute'
import bodyParser from 'body-parser'

// const mongodbUrl = config.get('mongoUri')
const mongodbUrl = 'mongodb+srv://hamlet:hamlet12345@cluster0-uegsu.azure.mongodb.net/nozo?retryWrites=true&w=majority'
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(error => console.log('hello'))

const app = express()

app.use(bodyParser.json())

app.use('/api/users', userRoute)

app.get('/api/products', (req, res) => {
  res.send(data.products)
})

app.get('/api/products/:id', (req, res) => {
  const product = data.products.find(product => product._id === req.params.id)

  product ? res.send(product) : res.status(404).send({ msg: 'Товар не найден' })
})

// const PORT = config.get('port') || 5000

app.listen(5000, () => console.log(`Server started at http://localhost:5000`))