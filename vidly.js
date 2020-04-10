const mongoose = require("mongoose");
const express = require("express");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const app = express();

const dbUri = 'mongodb://LAPTOP-LGQ90SB4:27017,LAPTOP-LGQ90SB4:27018,LAPTOP-LGQ90SB4:27019/vidly';
mongoose.connect(dbUri, { replicaSet: 'rs' })
    .then( () => console.log("We're in."))
    .catch( (err) => console.error(err.message));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);

app.listen(3000, () => console.log("listening on port 3000..."));