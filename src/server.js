"use strict"; // to use javascript in strict mode
require('dotenv').config();
const PORT = process.env.PORT || 3050;

const express = require("express");

// local modules
const notFoundHandler = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");
const foodRouter = require('./routes/food');
const clothesRouter = require('./routes/clothes');
const logger = require('./middleware/logger');
//this is how we handle routes inside the server

//this to parse the data from the req.body
const app = express();
app.use(express.json());

app.use(logger);
app.use(foodRouter);
app.use(clothesRouter);
app.use('*', notFoundHandler);
app.use(errorHandler);

// so if i want others to access my file i can do that easily using module like we can export anything number or [] or {} but usually we do exports {}'s
function start(PORT) {
    app.listen(PORT, () => {
        console.log(`Listen and Running on port ${PORT}`);
    });
}

module.exports = {
    app: app,
    start: start,
};