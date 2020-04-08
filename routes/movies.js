const express = require('express');
const {Movie, validate} = require("../models/movie");
const {Genre} = require("../models/genre");

const router = express.Router();

router.get("/", async (req, res) => {

    try {
        res.send( await Movie.find() )
    } 
    catch(err) {
        res.status(400).send(err.message);
    }
})

router.get("/:id", async (req, res) => {

    try {
        const movie = await Movie.findById(req.params.id);

        if( !movie ) return res.status(404).send('Movie not  found.')

        res.send(movie);
    } 
    catch(err) {
        res.status(400).send(err.message);
    }
})

router.post("/", async (req, res) => {

    let { error } = validate(req.body);

    if( error ) return res.status(400).send(error.details[0].message);

    try {
        let genre = await Genre.findById(req.body.genreId);

        if( !genre ) return res.status(404).send("Invalid genre.");

        req.body.genre = {
            genre: genre.genre,
            _id: genre._id
        }

        let movie = new Movie(req.body);
        movie = await movie.save();
        res.send( movie );
    } 
    catch(err) {
        res.status(400).send(err.message);
    }
})

router.put("/:id", async (req, res) => {

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
    catch(err){
        res.status(400).send(err.message);
    }
})

router.delete("/:id", async (req, res) => {

    try {
        const movie = Movie.findByIdAndDelete(req.params.id);

        if( !movie ) return res.status(404).send("Movie not found.")

        res.send(movie);
    } 
    catch(err) {
        res.status(400).send(err.message);
    }
})

module.exports = router;