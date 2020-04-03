const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");

const genreSchema = mongoose.Schema({

    genre: { type: String, 
             required: true,
             minlength: 3,
             maxlength: 50
    }             
});

const Genre = mongoose.model("Genre", genreSchema);

const router = express.Router();

router.get("", async (req, res) => {

    try {
        res.send( await Genre.find() );
    } 
    catch(err) {
        res.status(400).send(err.message);
    } 
});

router.get("/:id", async (req, res) => {

    try {
        const genre = await Genre.findById(req.params.id);

        if( !genre ) return res.status(404).send("Genre not found.")

        res.send(genre);
    } 
    catch(err) {
        res.status(400).send(err.message);
    }
});

router.post("", async (req, res) => {

    const { error } = validate(req.body);
    
    if ( error ) return res.status(400).send(error.details[0].message) ;

    let genre = new Genre({ genre : req.body.genre });
    
    try {
        res.send(await genre.save());
    } 
    catch(err) {
        res.status(400).send(err.message);
    } 
});

router.put("/:id", async (req, res) => {

    const { error } = validate(req.body);
    
    if ( error ) return res.status(400).send(error.details[0].message) ;

    try {

        const genre = await Genre.findById(req.params.id);
    
        if( !genre ) return res.status(404).send("Genre not found");
    
        genre.genre = req.body.genre;

        res.send(await genre.save());
    } 
    catch(err) {
        res.status(400).send(err.message);
    }
    
});

router.delete("/:id", async (req, res) => {
   
    try {
        const genre = await Genre.findByIdAndDelete(req.params.id);

    if( !genre ) return res.status(404).send("Genre not found...")

    res.send(genre);
    } 
    catch(err) {
        send.status(400).send(err.message);    
    } 
});

function validate(genre){

    const schema = { genre: Joi.string().required()  };

    return Joi.validate(genre, schema);
}

module.exports = router;