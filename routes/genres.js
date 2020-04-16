const admin = require("../midleware/admin");
const auth = require('../midleware/auth');
const express = require("express");
const {Genre, validate} = require('../models/genre');

const router = express.Router();

router.get("", async (req, res) => {

    try {
        res.send( await Genre.find() );
    } 
    catch(e) {
        res.status(400).send(e.message);
    } 
});

router.get("/:id", async (req, res) => {

    try {
        const genre = await Genre.findById(req.params.id);

        if( !genre ) return res.status(404).send("Genre not found.")

        res.send(genre);
    } 
    catch(e) {
        res.status(400).send(e.message);
    }
});

router.post("/", auth,  async (req, res) => {

    const { error } = validate(req.body);
    
    if ( error ) return res.status(400).send(error.details[0].message) ;

    let genre = new Genre({ genre : req.body.genre });
    
    try {
        res.send(await genre.save());
    } 
    catch(e) {
        res.status(400).send(e.message);
    } 
});

router.put("/:id", auth, async (req, res) => {

    const { error } = validate(req.body);
    
    if ( error ) return res.status(400).send(error.details[0].message) ;

    try {

        const genre = await Genre.findById(req.params.id);
    
        if( !genre ) return res.status(404).send("Genre not found");
    
        genre.genre = req.body.genre;

        res.send(await genre.save());
    } 
    catch(e) {
        res.status(400).send(e.message);
    }
    
});

router.delete("/:id", [auth, admin], async (req, res) => {
   
    try {
        const genre = await Genre.findByIdAndDelete(req.params.id);

    if( !genre ) return res.status(404).send("Genre not found...")

    res.send(genre);
    } 
    catch(e) {
        send.status(400).send(e.message);    
    } 
});

module.exports = router;