const express = require("express");
const Joi = require("joi");
const logger = require("./logger");
const genres = require("./routes/genres")
const app = express();

app.use(express.json());
app.use(logger);
app.use("/api/genres", genres)

app.listen(3000, () => console.log("listening on port 3000..."))