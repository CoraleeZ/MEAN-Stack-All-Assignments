var express = require("express");
var app = express();
///
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser,JSON());
///
const server = app.listen(5000);
const io = require('socket.io')(server);
///
// var mongoose = require('mongoose');
//only old version of mongoose need it/// mongoose.Promise = global.Promise;
///
var path = require('path');
app.use(express.static(path.join(__dirname, './static')));
// app.use('/static', express.static('static'));
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
const flash = require('express-flash');
app.use(flash());
// express and socket.io share session setting
io.use(function(socket, next) {
    sessionmiddleware(socket.request, socket.request.res, next);
});
///

require('./server/config/routes')(app);