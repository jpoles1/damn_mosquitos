require('dotenv').config();
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
app.use(morgan('common', {stream: logStream}))
//Start listening
var http_port = process.env.PORT || process.env.CUSTOM_PORT || 8080;
app.listen(http_port);
console.log("Listening for HTTP traffic on port:", http_port)
// support json encoded bodies
app.use(bodyParser.json());
// support url encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//Sets the template engine to be handlebars
var hbs = exphbs.create({defaultLayout: 'base'})
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
//Serves all files in the res folder as static resources
global.router = express.Router();
global.api_router = express.Router();
require("./routers/routers")
var working_url = process.env.BASE_URL || "";
app.use(working_url + '/res', express.static('res'));
app.use(working_url + "/api", api_router);
app.use(working_url, router);
/*global.dakAPI = require("./logic/dakAPI")
global.dakActuators = require("./logic/dakActuators")
global.dakSleep = require("./logic/dakSleep")
global.dakRules = require("./logic/dakRules")
global.dakSensors = require("./logic/dakSensors")*/
module.exports = app;
