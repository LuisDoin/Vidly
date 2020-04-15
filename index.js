const config = require('config')
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require("mongoose");
const express = require("express");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/Users");
const auth = require("./routes/auth")
const app = express();

if( !config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey not defined');
    process.exit(1);
}

const dbUri = 'mongodb://LAPTOP-LGQ90SB4:27017,LAPTOP-LGQ90SB4:27018,LAPTOP-LGQ90SB4:27019/vidly';
mongoose.connect(dbUri, { replicaSet: 'rs' })
    .then( () => console.log("We're in."))
    .catch( (err) => console.error(err.message));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.listen(3000, () => console.log("listening on port 3000..."));