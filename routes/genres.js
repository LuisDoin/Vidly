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

/* const genres = [

    { id: 1, genre: "Horror" },
    { id: 2, genre: "Action" },
    { id: 1, genre: "Comedy" }n,

]; */

router.get("", async function getGenres(req, res) {

    /* let gnr = "";
    genres.forEach( c => gnr += c.genre + " " );
    res.send(gnr); */

    res.send( await Genres.find() );
    

});

router.post("", async function createGenre(req, res) {

    const { error } = validation(req.body)
    
    if ( error ) 
        return res.status(400).send(error.details[0].message) ;
    
    /* const gnr = { id: genres.length + 1, genre: req.body.genre };
    
    genres.push(gnr);
    res.send(gnr) */

    let genre = new Genres({ genre : req.body.genre });
    
    res.send(await genre.save());
});

router.put("/:id", async function updateGenre(req, res) {

    const { error } = validation(req.body);
    
    if ( error ) return res.status(400).send(error.details[0].message) ;

    
    /* const genre = genres.find( c => c.id === parseInt(req.params.id) );
    
    if ( !genre )
        return res.status(404).send("genre not found");

    genre.genre = req.body.genre;
    res.send(genre); */

    const genre = await Genres.findById(req.params.id);

    console.log(genre);
    
    if( !genre ) return res.status(404).send("Genre not found");
    
    genre.genre = req.body.genre;

    res.send(await genre.save());
});

router.delete("/:id", async function deleteGenre(req, res) {

    /*const genre = genres.find( c => c.id === parseInt(req.params.id) );
    
     if ( !genre )
        return res.status(404).send("genre not found");

    genres.splice( parseInt(req.params.id) - 1, 1 );

    let gnr = "";
    genres.forEach( c => gnr += c.genre + " " );
    res.send(gnr); */
    
    const genre = await Genres.findByIdAndDelete(req.params.id);

    if( !genre ) return res.status(404).send("Genre not found...")

    res.send(genre);
});

function validation(genre){

    const schema = { genre: Joi.string().required()  };

    return Joi.validate(genre, schema);
}

async function getGenres(){

    return  
}

/* async function createGenre(genre){

    const teste = await genre.save();
    console.log("teste: " + teste);
    return teste;
}
 */
async function updateGenre(req){

    
 }

 async function deleteGenre(req){

    return 
}


module.exports = router;