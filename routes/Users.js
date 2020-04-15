const express = require('express');
const {User, validate} = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');

const router = express.Router();

router.get("/", async (req, res) => {

    try {
        res.send( await User.find() );
    }
    catch(err) {
        res.status(400).send(err.message);
    }
})

router.get("/:id", async (req, res) => {

    try {
        
        const user = await User.findById(req.params.id);

        if( !user ) return res.status(404).send("User not found.");

        res.send(user);
    } 
    catch(err) {
        res.status(400).send(err.message);
    }
})

router.post("/", async (req,res) => {

    try {
        
        const {error} = validate(req.body);

        if( error ) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.email});

        if( user ) return res.status(400).send("User already registered");

        user = new User( _.pick(req.body, ["_id", "name", "email", "password"]) );
        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const token = user.generateAuthToken();

        res.header('x-auth-token', token).send( _.pick(user, ["_id", "name", "email"]) );

    } 
    catch(err) {
        res.status(400).send(err.message);
    }
    
})

router.put("/:id", async (req, res) => {

    try {
        
        let user = await User.findById(req.params.id);

        if( !user ) return res.status(404).send("User not found.");

        const { error } = validate(req.body)

        if( error ) return res.status(400).send(error.details[0].message);

        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;

        await user.save();
        
        res.send( user );
    } 
    catch(err) {
        res.status(400).send(err.message)
    }
})

router.delete("/:id", async (req, res) => {

    try {
        
        const user = await User.findByIdAndDelete(req.params.id);

        if( !user ) return res.status(404).send("User not found.");

        res.send(user);
    } 
    catch(err) {
        res.status(400).send(err.message);
    }
})

module.exports = router;