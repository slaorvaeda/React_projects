const express = require('express');
const { Book } = require('../models/bookmodels');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: 'All fields are required'
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
})

router.get('/', async (req, res) => {
    try {

        const books = await Book.find({});
        res.status(200).json({
            count: books.length,
            data: books
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

//Routes for get all books from database by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const books = await Book.findById(id);
        // const books = await Book.find({});
        res.status(200).json({
            count: books.length,
            data: books
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

//Routes for getting update
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: 'All fields are required'
            });
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id,req.body)
        if (!result) {
            return res.status(404).send({
                message: 'Book not found'
            });
        }
        return res.status(200).send({
            message: 'Book updated successfully',
            data: result,
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

//Routes for delete
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the book ID from the route parameters

        // Find and delete the book by its ID
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send({
                message: 'Book not found'
            });
        }

        return res.status(200).send({
            message: 'Book has been deleted successfully'
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;