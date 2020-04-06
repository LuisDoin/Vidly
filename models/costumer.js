const mongoose = require('mongoose');
const Joi = require('joi');

const Costumer = mongoose.model("Costumer", new mongoose.Schema({

    isGold: {
        type: Boolean,
        default: false
    },
    name: { 
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        validate: /^[0-9]{9}$/
    }
}));

function validateCostumer(costumer){

    const schema = { 
        
        isGold: Joi.boolean(),
        name: Joi.string().required(),
        phone: Joi.string().required().regex(/^[1-9]{9}$/)
    }

    return Joi.validate(costumer, schema);
}

exports.validate = validateCostumer;
exports.Costumer = Costumer;
