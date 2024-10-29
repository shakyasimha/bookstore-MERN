import express, { request } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { PORT, mongoDBURL } from './config.js'
import booksRoute from './routes/booksRoute.js'

const app = express()

// For enabling json requests
app.use(express.json())

app.get('/', (request, response) => {
  console.log(request)
  return response.status(200).send('Welcome to MERN Stack Tutorial')
})

// Using routes from booksRoute
app.use('/books', booksRoute)

// CORS middleware
app.use(cors({
    origin: 'https://localhost:5000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}))

// Mongoose connect to MongoDB
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database')
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`)
    })
  })
  .catch(() => {
    console.log(error)
  })
