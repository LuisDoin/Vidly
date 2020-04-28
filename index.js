const express = require("express");
const app = express();

const teste = require('./playground/teste');



require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

app.listen(3000, () => console.log("listening on port 3000..."));

teste();