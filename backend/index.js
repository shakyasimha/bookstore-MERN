import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from './config.js';
import { Book } from "./models/bookModel.js";

const app = express();

// For enabling json requests
app.use(express.json());

app.get('/', (request, response)=>{
    console.log(request);
    return response.status(200).send('Welcome to MERN Stack Tutorial');  
});

// Route for saving a book
app.post('/books', async (request, response) => {
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(200).send({
                message: 'Provide all the fields: title, author, publishYear'
            });
        }

        const newBook = {
            title: request.body.title, 
            author: request.body.author, 
            publishYear: request.body.publishYear
        }

        const book = await Book.create(newBook); 

        return response.status(200).send(book);
    } catch(error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});


// Route for getting all the books
app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json(books);
    } catch(error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
});

// Route for getting books by id 
app.get('books/:id', async (request, response) => {
    try {
        const {id} = request.params;

        const book = await Book.find({id});

        
    } catch(error) {
        console.log(error);
        return response.status(500).send({message: error.message});
    }
});

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App connected to database');
        app.listen(PORT, ()=>{
            console.log(`App is listening to port: ${PORT}`);
        })
    })
    .catch(()=>{
        console.log(error);
    });