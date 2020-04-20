const asyncMiddleware = require('../middleware/async');
const admin = require("../middleware/admin");
const auth = require('../middleware/auth');
const express = require('express');
const mongoose = require('mongoose');
const {Rental, validate} = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');

const router = express.Router();

router.get("/", asyncMiddleware( async (req, res) => {
    res.send( await Rental.find().sort("-dateOut") );
}));

router.post("/", auth,  async (req, res) => {
    
    const {error} = validate(req.body);
    
    if( error ) return res.status(400).send(error.details[0].message);
    
    const session = await mongoose.startSession();
    
    session.startTransaction();
    
    try {
        
        const customer = await Customer.findById(req.body.customerId);
        
        if( !customer ) return res.status(404).send("Invalid customer.");
        
        const movie = await Movie.findById(req.body.movieId);
        
        if( !movie ) return res.status(404).send("Invalid movie.");
        
        if( movie.numberInStock === 0 ) return res.status(400).send("Movie not available in stock.");
        
        const [rental] = await Rental.create([{
            
            customer: {
                _id: customer._id,
                name: customer.name,
                isGold: customer.isGold,
                phone: customer.phone
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate | "undefined"
            }
            
        }], {session} );
        
        await Movie.updateOne( { _id: movie._id }, 
            { $set: { numberInStock: movie.numberInStock - 1 } },  
            { runValidators: true} )
            .session(session);
            
            await session.commitTransaction();
            
            res.send(rental);
    } 
    catch(e) {            
    
        await session.abortTransaction();
        console.log(e.message); 
        res.status(500).send("Something went wrong...");
    }
    finally{ session.endSession(); }
        
});
    
router.delete('/:id', [auth, admin], asyncMiddleware( async (req, res) => {
        
    const rental = await Rental.findByIdAndDelete(req.params.id);
    
    if( !rental ) return res.status(404).send("Rental not found.");
    
    if( !(rental.movie.dateReturned) ){
        
        let movie = await Movie.findById(rental.movie._id);
        
        movie.numberInStock++;
        movie.save();
    }
    
    res.send(rental);

}));
    
    module.exports = router;