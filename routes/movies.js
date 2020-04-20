const asyncMiddleware = require('../middleware/async');
const admin = require("../middleware/admin");
const auth = require('../middleware/auth');
const express = require('express');
const {Movie, validate} = require("../models/movie");
const {Genre} = require("../models/genre");

const router = express.Router();

router.get("/", asyncMiddleware( async (req, res) => {
	res.send( await Movie.find() );
}));

router.get("/:id", asyncMiddleware( async (req, res) => {
	
	const movie = await Movie.findById(req.params.id);
	
	if( !movie ) return res.status(404).send('Movie not  found.')
	
	res.send(movie);
	
}));

router.post("/", auth, asyncMiddleware( async (req, res) => {
	
	let { error } = validate(req.body);
	
	if( error ) return res.status(400).send(error.details[0].message);
	
	let genre = await Genre.findById(req.body.genreId);
	
	if( !genre ) return res.status(404).send("Invalid genre.");
	
	req.body.genre = {
		genre: genre.genre,
		_id: genre._id
	}
	
	const movie = new Movie(req.body);
	await movie.save();
	
	res.send( movie );
	
}));

router.put("/:id", auth, asyncMiddleware( async (req, res) => {
	
	const { error } = validate(req.body);
	
	if( error ) return res.status(400).send(error.details[0].message);
	
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
}));

router.delete("/:id", [auth, admin], asyncMiddleware( async (req, res) => {
	
	const movie = Movie.findByIdAndDelete(req.params.id);
	
	if( !movie ) return res.status(404).send("Movie not found.")
	
	res.send(movie);
	
}));

module.exports = router;