// const express = require('express')
// const mongoose= require('mongoose')
// const bodyParser = require('body-parser')

// const app = express();

// app.use(bodyParser.json())

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost/books', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB Connected...'))
//   .catch(err => console.log(err));



// const express = require('express');
// const app = express();
// const fs = require('fs');

// // Sample book data (you can load this from a JSON file or database)
// let books = [
//   { id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
//   { id: 2, title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling' },
// ];

// // Middleware
// app.use(express.json());

// // GET all books
// app.get('/', (req, res) => {
//   res.send("books");
// });

// app.get('/books', (req, res) => {
//   res.json(books);
// });

// // GET a specific book by ID
// app.get('/books/:id', (req, res) => {
//   const book = books.find(b => b.id === parseInt(req.params.id));
//   if (!book) {
//     return res.status(404).json({ error: 'Book not found' });
//   }
//   res.json(book);
// });

// // POST a new book
// app.post('/books', (req, res) => {
//   const newBook = req.body;
//   newBook.id = books.length + 1; // Assign a new ID
//   books.push(newBook);
//   res.status(201).json(newBook);
// });

// // PUT (update) a book
// app.put('/books/:id', (req, res) => {
//   const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
//   if (bookIndex === -1) {
//     return res.status(404).json({ error: 'Book not found' });
//   }
//   books[bookIndex] = { ...books[bookIndex], ...req.body };
//   res.json(books[bookIndex]);
// });

// // DELETE a book
// app.delete('/books/:id', (req, res) => {
//   const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
//   if (bookIndex === -1) {
//     return res.status(404).json({ error: 'Book not found' });
//   }
//   books.splice(bookIndex, 1);
//   res.status(204).send();
// });

// // Start the server
// app.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });



// import { PORT } from './config.mjs';