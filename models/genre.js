const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({

    genre: { 
        type: String, 
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 50
    }             
});
const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(genre){

    const schema = { genre: Joi.string().required() };

    return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.validate = validateGenre;
exports.genreSchema = genreSchema;