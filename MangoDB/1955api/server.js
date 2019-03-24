var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
const server = app.listen(8000);
require('./server/routes')(app);