const express = require('express');
const {Rental, validate} = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');

const router = express.Router();

router.get("/", async (req, res) => {

    try {
        res.send( await Rental.find().sort("-dateOut") );
    } 
    catch(err) {
        res.status(400).send(err.message)
    }
});

router.post("/", async (req, res) => {

    const {error} = validate(req.body);

    if( error ) return res.status(400).send(error.details[0].message);

    try {
        const customer = await Customer.findById(req.body.customerId);

        
        if( !customer ) return res.status(404).send("Invalid customer.");
        
        const movie = await Movie.findById(req.body.movieId);

        if( !movie ) return res.status(404).send("Invalid movie.");

        if( movie.numberInStock === 0 ) return res.status(400).send("Movie not available in stock.");

        
        let rental = new Rental({

            customer: {
                _id: customer._id,
                name: customer.name,
                isGold: customer.isGold,
                phone: customer.phone
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            }

        })

        
        rental = await rental.save();

        movie.numberInStock--;
        movie.save();

        res.send(rental);

    } 
    catch(err) {
        res.status(400).send(err.message);
    }
});

router.delete('/:id', async (req, res) => {

    const rental = Rental.findByIdAndDelete(req.params.id);

    if( !rental ) return res.status(404).send("Rental not found.");

    if( !rental.movie.dateReturned ){
    
        let movie = Movie.findById(rental.movie.movieId);

        movie.numberInStock++;
        movie.save();
    }

    res.send(rental);
})

module.exports = router;