const mongoose = require('mongoose');
const Joi = require('joi');

const Rental = mongoose.model('Rental', new mongoose.Schema({

    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                index: true
            },
            isGold: {
                type: Boolean,
                required: true
            },
            phone: {
                type: String,
                required: true
            }
        })
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true
            },
            dailyRentalRate: {
                type: Number,
                required: true
            },
            dateOut: {
                type: Date,
                default: Date.now
            },
            dateReturned: {
                type: Date
            },
            rentalFee: {
                type: Number,
                min: 0
            }
        })
    }
}));

function validateRental(rental){

    const schema = {
        customerId : Joi.objectId().required(),
        movieId : Joi.objectId().required()
    };

    return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.validate = validateRental;