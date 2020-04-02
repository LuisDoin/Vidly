
const express = require("express")
const Joi = require("joi")

const router = express.Router();

const genres = [

    { id: 1, genre: "Horror" },
    { id: 2, genre: "Action" },
    { id: 1, genre: "Comedy" },

];

router.get("", (req, res) => {

    let gnr = "";
    genres.forEach( c => gnr += c.genre + " " );
    res.send(gnr);

});

router.post("", (req, res) => {

    const { error } = validation(req.body)
    
    if ( error ) 
        return res.status(400).send(error.details[0].message) ;
    
    const gnr = { id: genres.length + 1, genre: req.body.genre };
    
    genres.push(gnr);
    res.send(gnr)
});

router.put("/:id", (req, res) => {

    const { error } = validation(req.body);
    
    if ( error ) 
        return res.status(400).send(error.details[0].message) ;

    
    const genre = genres.find( c => c.id === parseInt(req.params.id) );
    
    if ( !genre )
        return res.status(404).send("genre not found");

    genre.genre = req.body.genre;
    res.send(genre);

});

router.delete("/:id", (req, res) => {

    const genre = genres.find( c => c.id === parseInt(req.params.id) );
    
    if ( !genre )
        return res.status(404).send("genre not found");

    genres.splice( parseInt(req.params.id) - 1, 1 );

    let gnr = "";
    genres.forEach( c => gnr += c.genre + " " );
    res.send(gnr);

});

function validation(genre){

    const schema = { genre: Joi.string().required()  };

    return Joi.validate(genre, schema);
}

module.exports = router;