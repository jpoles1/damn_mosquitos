require('dotenv').config();
if(!process.env.PORT) throw new Error("Need a valid server port.");
var fs = require('fs')
var path = require('path')
global.db = require("./logic/db");
global.express = require("express");
var morgan = require('morgan');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
//Create express server
var app = express()
// create a write stream (in append mode)
var logStream = fs.createWriteStream(path.join(__dirname, 'data/logs/server.log'), {flags: 'a'})
// setup the logger
app.use(morgan('dev', {stream: logStream}))
//Start listening
app.listen(process.env.PORT);
console.log("Listening for HTTP traffic on port:", process.env.PORT)
// support json encoded bodies
app.use(bodyParser.json());
// support url encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//Sets the template engine to be handlebars
var hbs = exphbs.create({defaultLayout: 'base'})
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
//Serves all files in the res folder as static resources
global.router = express.Router();
global.api_router = express.Router();
app.use('/res', express.static('res'));
app.use(process.env.BASE_URL || "", router);
/*global.dakAPI = require("./logic/dakAPI")
global.dakActuators = require("./logic/dakActuators")
global.dakSleep = require("./logic/dakSleep")
global.dakRules = require("./logic/dakRules")
global.dakSensors = require("./logic/dakSensors")
require("./routers/routers")*/
module.exports = app;
