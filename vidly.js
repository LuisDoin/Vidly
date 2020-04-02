const mongoose = require("mongoose");
const express = require("express");
const logger = require("./logger");
const genres = require("./routes/genres")
const app = express();

mongoose.connect('mongodb://localhost/vidly')
    .then( () => console.log("We're in."))
    .catch( (err) => console.error('oops... db?'));

app.use(express.json());
app.use(logger);
app.use("/api/genres", genres)

app.listen(3000, () => console.log("listening on port 3000..."))