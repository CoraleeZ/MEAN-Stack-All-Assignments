var express = require("express");
var app = express();
///
var bodyParser = require('body-parser');
const server = app.listen(5000, () => console.log('listening on port 5000'));
var path = require('path');
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
///
var session = require('express-session');
const sessionmiddleware = session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
})
app.use(sessionmiddleware);
///
app.use(bodyParser.urlencoded({ extended: true }));
///
const flash = require('express-flash');
app.use(flash());


require('./server/config/routes.js')(app)