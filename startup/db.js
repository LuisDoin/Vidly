const mongoose = require("mongoose");

module.exports = function(){
    
    const dbUri = 'mongodb://LAPTOP-LGQ90SB4:27017,LAPTOP-LGQ90SB4:27018,LAPTOP-LGQ90SB4:27019/vidly';
    
    mongoose.connect(dbUri, { replicaSet: 'rs' })
        .then( () => console.log("We're in."))
}