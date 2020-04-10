const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');

const Movie = mongoose.model("Movie", new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0
    },
    dailyRentalRate: Number
}));

function validateMovie(movie){

    const schema = {

        title: Joi.string().required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().required().min(5),
        dailyRentalRate: Joi.number()
    }

    return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;