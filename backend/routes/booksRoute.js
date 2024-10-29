import express from 'express'
import { Book } from '../models/bookModel.js'

const router = express.Router()

// Route for saving a book
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(200).send({
        message: 'Provide all the fields: title, author, publishYear'
      })
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear
    }

    const book = await Book.create(newBook)

    return response.status(200).send(book)
  } catch (error) {
    console.log(error.message)
    return response.status(500).send({ message: error.message })
  }
})

// Route for getting all the books
router.get('/', async (request, response) => {
  try {
    const books = await Book.find({})

    return response.status(200).json(books)
  } catch (error) {
    console.log(error)
    return response.status(500).send({ message: error.message })
  }
})

// Route for getting books by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const book = await Book.findById(id)

    if (!book) {
      return response.status(404).json({ message: 'Book not found.' })
    } else {
      return response.status(200).json(book)
    }
  } catch (error) {
    console.log(error)
    return response.status(500).send({ message: error.message })
  }
})

// Updating books
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Provide all the field: title, author, publishYear'
      })
    } else {
      const { id } = request.params
      const result = await Book.findByIdAndUpdate(id, request.body)

      if (!result) {
        return response.status(404).send({ message: 'Book not found' })
      } else {
        const book = await Book.findById(id)

        return response.status(200).send({
          message: 'Book updated successfully',
          book: book
        })
      }
    }
  } catch (error) {
    console.log(error)
    return response.status(500).send({ message: error.message })
  }
})

// Deleting the books
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const book = await Book.findByIdAndDelete(id)

    if (!book) {
      return response.status(404).send({
        message: 'Book not found'
      })
    }

    return response.status(200).send({
      book: 'Book deleted successfully'
    })
  } catch (error) {
    console.log(error)
    return response.status(500).send({ message: error.message })
  }
})

export default router
