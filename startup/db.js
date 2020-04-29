const mongoose = require("mongoose");
const config = require("config");

module.exports = function(){
    
    const db = config.get('db');
    
    mongoose.connect(db, { replicaSet: 'rs' })
        .then( () => console.log(`We're in. Conected to ${db}`));
}