const Joi = require('joi');
const express = require('express');
const {User} = require('../models/user');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post("/", async (req,res) => {

    try {
        
        const {error} = validate(req.body);

        if( error ) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email});
        
        if( !user ) return res.status(400).send("Invalid email or password.");
        
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if( !validPassword ) return res.status(400).send("Invalid email or password.");
        
        const token = user.generateAuthToken();

        res.send(token);

    } 
    catch(err) {
        res.status(400).send(err.message);
    }
    
})

function validate(req){

    const schema = {

        email: Joi.string().required().email(),
        password: Joi.string().required()
    }

    return Joi.validate(req, schema);
}

module.exports = router;