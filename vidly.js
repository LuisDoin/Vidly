const mongoose = require("mongoose");
const express = require("express");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const app = express();

mongoose.connect('mongodb://localhost/vidly')
    .then( () => console.log("We're in."))
    .catch( (err) => console.error(err.message));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);

app.listen(3000, () => console.log("listening on port 3000..."));