const admin = require("../midleware/admin");
const auth = require('../midleware/auth');
const express = require('express');
const router = express.Router();
const {Customer, validate} = require('../models/customer');

router.get("", async (req, res) => {

    try{
        const customer = await Customer.find();
        res.send(customer);
    }
    catch(e) {
        res.status(400).send(e.message);
    } 
});

router.get("/:id", async (req, res) => {

    try{
        const costumer = await Customer.findById(req.params.id)

        if( !costumer ) return res.status(404).send("costumer not found.");

        res.send(costumer);   
    }
    catch(e) {
        res.status(400).send(e.message);
    }
});

router.post("/", auth, async (req, res) => {

    try {
    
        const { error } = validate(req.body);

        if( error ) return res.status(400).send(error.details[0].message);
    
        const customer = new Customer(req.body);

        await customer.save();
        
        res.send(customer);
    } 
    catch(e) {
        res.status(400).send(e.message);
    }
});

router.put("/:id", auth, async (req, res) => {

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
    catch(e) {
        res.status(400).send(e.message);
    }
});

router.delete("/:id", [auth, admin], async (req, res ) => {

    try {
        
        const customer = await Customer.findByIdAndDelete(req.params.id);

        if( !customer ) return res.status(404).send("Customer not found.");

        res.send(customer); 
    } 
    catch(e) {
        res.status(404).send(e.message);
    }
});

module.exports = router;