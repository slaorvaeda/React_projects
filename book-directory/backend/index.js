const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { PORT, mongoDBURL } = require('./config');
const bookRoute = require('./routes/bookRoute');

const app = express();

// Middleware for handling CORS policy
// Option 1 (allows all origins)
app.use(cors());

// Option 2 (restricting origin and methods)
app.use(cors({
    origin: 'http://localhost:5173', // Corrected to 'http' if your frontend is running on HTTP
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Use the book routes
app.use('/books', bookRoute);

// Connecting to MongoDB and starting the server
mongoose
    // .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .connect(mongoDBURL)
    .then(() => {
        console.log("App is connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
