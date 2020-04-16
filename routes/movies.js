const admin = require("../midleware/admin");
const auth = require('../midleware/auth');
const express = require('express');
const {Movie, validate} = require("../models/movie");
const {Genre} = require("../models/genre");

const router = express.Router();

router.get("/", async (req, res) => {

    try {
        res.send( await Movie.find() );
    } 
    catch(e) {
        res.status(400).send(e.message);
    }
})

router.get("/:id", async (req, res) => {

    try {
        const movie = await Movie.findById(req.params.id);

        if( !movie ) return res.status(404).send('Movie not  found.')

        res.send(movie);
    } 
    catch(e) {
        res.status(400).send(e.message);
    }
})

router.post("/", auth, async (req, res) => {

    let { error } = validate(req.body);

    if( error ) return res.status(400).send(error.details[0].message);

    try {
        let genre = await Genre.findById(req.body.genreId);

        if( !genre ) return res.status(404).send("Invalid genre.");

        req.body.genre = {
            genre: genre.genre,
            _id: genre._id
        }

        const movie = new Movie(req.body);
        await movie.save();
        
        res.send( movie );
    } 
    catch(e) {
        res.status(400).send(e.message);
    }
})

router.put("/:id", auth, async (req, res) => {

    const { error } = validate(req.body);

    if( error ) return res.status(400).send(error.details[0].message);

    try {
        let movie = await Movie.findById(req.params.id);

        if( !movie ) return res.status(404).send("Movie not found.")

        let genre = await Genre.findById(req.body.genreId);

        if( !genre ) return res.status(404).send("Invalid genre.");

        req.body.genre = { 
            genre: genre.genre,
            _id: genre._id 
        };
        movie.title = req.body.title;
        movie.genre = req.body.genre;
        movie.numberInStock = req.body.numberInStock;
        movie.dailyRentalRate = req.body.dailyRentalRate;
        
        res.send( await movie.save() );
    } 
    catch(e){
        res.status(400).send(e.message);
    }
})

router.delete("/:id", [auth, admin], async (req, res) => {

    try {
        const movie = Movie.findByIdAndDelete(req.params.id);

        if( !movie ) return res.status(404).send("Movie not found.")

        res.send(movie);
    } 
    catch(e) {
        res.status(400).send(e.message);
    }
})

module.exports = router;