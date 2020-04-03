const mongoose = require("mongoose");
const express = require("express");
const logger = require("./logger");
const genres = require("./routes/genres");
const costumers = require("./routes/costumers");
const app = express();

mongoose.connect('mongodb://localhost/vidly')
    .then( () => console.log("We're in."))
    .catch( (err) => console.error(err.message));

app.use(express.json());
app.use("/api/genres", genres)
app.use("/api/costumers", costumers)

app.listen(3000, () => console.log("listening on port 3000..."))