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

const Genres = mongoose.model("Genre", genreSchema);

const router = express.Router();

router.get("", async (req, res) => {

    res.send( await Genres.find() );
});

router.post("", async (req, res) => {

    const { error } = validation(req.body)
    
    if ( error ) 
        return res.status(400).send(error.details[0].message) ;

    let genre = new Genres({ genre : req.body.genre });
    
    res.send(await genre.save());
});

router.put("/:id", async (req, res) => {

    const { error } = validation(req.body);
    
    if ( error ) return res.status(400).send(error.details[0].message) ;

    const genre = await Genres.findById(req.params.id);

    console.log(genre);
    
    if( !genre ) return res.status(404).send("Genre not found");
    
    genre.genre = req.body.genre;

    res.send(await genre.save());
});

router.delete("/:id", async (req, res) => {
   
    const genre = await Genres.findByIdAndDelete(req.params.id);

    if( !genre ) return res.status(404).send("Genre not found...")

    res.send(genre);
});

function validation(genre){

    const schema = { genre: Joi.string().required()  };

    return Joi.validate(genre, schema);
}

module.exports = router;