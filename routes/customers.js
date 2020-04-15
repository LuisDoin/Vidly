const express = require('express');
const router = express.Router();
const {Customer, validate} = require('../models/customer');

router.get("", async (req, res) => {

    try{
        const customer = await Customer.find();
        res.send(customer);
    }
    catch(err) {
        res.status(400).send(err.message);
    } 
});

router.get("/:id", async (req, res) => {

    try{
        const costumer = await Customer.findById(req.params.id)

        if( !costumer ) return res.status(404).send("costumer not found.");

        res.send(costumer);   
    }
    catch(err) {
        res.status(400).send(err.message);
    }
});

router.post("", async (req, res) => {

    try {
    
        const { error } = validate(req.body);

        if( error ) return res.status(400).send(error.details[0].message);
    
        const customer = new Customer(req.body);

        await customer.save();
        
        res.send(customer);
    } 
    catch(err) {
        res.status(400).send(err.message);
    }
});

router.put("/:id", async (req, res) => {

    const { error } = validate(req.body);

    if( error ) return res.status(400).send(error.details[0].message);
    
    try {
        let customer = await Customer.findById(req.params.id);
        
        if( !customer ) return res.status(404).send("Customer not found.")

        customer.isGold = req.body.isGold;
        customer.name = req.body.name;
        customer.phone = req.body.phone;

        res.send( await customer.save() );
    } 
    catch(err) {
        res.status(400).send(err.message);
    }
});

router.delete("/:id", async (req, res ) => {

    try {
        
        const customer = await Customer.findByIdAndDelete(req.params.id);

        if( !customer ) return res.status(404).send("Customer not found.");

        res.send(customer); 
    } 
    catch(err) {
        res.status(404).send(err.message);
    }
});

module.exports = router;