const asyncMiddleware = require('../middleware/async');
const admin = require("../middleware/admin");
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const {Customer, validate} = require('../models/customer');

router.get("", asyncMiddleware( async (req, res) => {
    
    const customer = await Customer.find();
    res.send(customer); 
}));

router.get("/:id", asyncMiddleware( async (req, res) => {
    
    const costumer = await Customer.findById(req.params.id)
    
    if( !costumer ) return res.status(404).send("costumer not found.");
    
    res.send(costumer);   
}));

router.post("/", auth, asyncMiddleware( async (req, res) => {
    
    const { error } = validate(req.body);
    
    if( error ) return res.status(400).send(error.details[0].message);
    
    const customer = new Customer(req.body);
    
    await customer.save();
    
    res.send(customer);
    
}));

router.put("/:id", auth, asyncMiddleware( async (req, res) => {
    
    const { error } = validate(req.body);
    
    if( error ) return res.status(400).send(error.details[0].message);
    
    let customer = await Customer.findById(req.params.id);
    
    if( !customer ) return res.status(404).send("Customer not found.")
    
    customer.isGold = req.body.isGold;
    customer.name = req.body.name;
    customer.phone = req.body.phone;
    
    res.send( await customer.save() );
}));

router.delete("/:id", [auth, admin], asyncMiddleware( async (req, res ) => {
    
    const customer = await Customer.findByIdAndDelete(req.params.id);
    
    if( !customer ) return res.status(404).send("Customer not found.");
    
    res.send(customer); 
    
}));

module.exports = router;