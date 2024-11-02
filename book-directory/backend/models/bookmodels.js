const mongoose = require('mongoose');
const bookSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        publishYear: { type: Number, required: true },

    },
    {
        timestamps: true,
        // versionKey: false,
    }
);
const Book = mongoose.model('Cat',bookSchema);

module.exports = {Book};