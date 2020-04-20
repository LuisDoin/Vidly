const asyncMiddleware = require('../middleware/async');
const admin = require("../middleware/admin");
const auth = require('../middleware/auth');
const express = require("express");
const {Genre, validate} = require('../models/genre');

const router = express.Router();

router.get("", asyncMiddleware( async (req, res) => {
    res.send( await Genre.find() );
}));

router.get("/:id", asyncMiddleware( async (req, res) => {
    
    const genre = await Genre.findById(req.params.id);
    
    if( !genre ) return res.status(404).send("Genre not found.")
    
    res.send(genre);
    
}));

router.post("/", auth,  asyncMiddleware( async (req, res) => {
    
    const { error } = validate(req.body);
    
    if ( error ) return res.status(400).send(error.details[0].message) ;
    
    let genre = new Genre({ genre : req.body.genre });
    
    res.send(await genre.save());
    
}));

router.put("/:id", auth, asyncMiddleware( async (req, res) => {
    
    const { error } = validate(req.body);
    
    if ( error ) return res.status(400).send(error.details[0].message) ;
    
    const genre = await Genre.findById(req.params.id);
    
    if( !genre ) return res.status(404).send("Genre not found");
    
    genre.genre = req.body.genre;
    
    res.send(await genre.save());
    
}));

router.delete("/:id", [auth, admin], asyncMiddleware( async (req, res) => {
    
    const genre = await Genre.findByIdAndDelete(req.params.id);
    
    if( !genre ) return res.status(404).send("Genre not found...")
    
    res.send(genre); 
    
}));

module.exports = router;