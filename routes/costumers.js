const express = require('express');
const router = express.Router();
const {Costumer, validate} = require('../models/costumer');

router.get("", async (req, res) => {

    try{
        const costumer = await Costumer.find();
        res.send(costumer);
    }
    catch(err) {
        res.status(400).send(err.message);
    } 
});

router.get("/:id", async (req, res) => {

    try{
        const costumer = await Costumer.findById(req.params.id)

        if( !costumer ) return res.status(404).send("costumer not found.");

        res.send(costumer);   
    }
    catch(err) {
        res.status(400).send(err.message);
    }
});

router.post("", async (req, res) => {

    const { error } = validate(req.body);

    if( error ) return res.status(400).send(error.details[0].message);
    
    let costumer = new Costumer(req.body);

    try {
        costumer = await costumer.save()
        res.send(costumer);
    } 
    catch(err) {
        res.status(400).send(err.message);
    }
});

router.put("/:id", async (req, res) => {

    const { error } = validate(req.body);

    if( error ) return res.status(400).send(error.details[0].message);
    
    try {
        let costumer = await Costumer.findById(req.params.id);
        
        if( !costumer ) return res.status(404).send("Costumer not found.")

        costumer = new Costumer(req.body);
        res.send( await costumer.save() );
    } 
    catch(err) {
        res.status(400).send(err.message);
    }
});

router.delete("/:id", async (req, res ) => {

    try {
        
        const costumer = await Costumer.findByIdAndDelete(req.params.id);

        if( !costumer ) return res.status(404).send("Costumer not found.");

        res.send( costumer ); 
    } 
    catch(err) {
        res.status(404).send(err.message);
    }
});

module.exports = router;