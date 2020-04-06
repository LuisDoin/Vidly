const express = require("express");
const {Genre, validate} = require('../models/genre');

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

module.exports = router;