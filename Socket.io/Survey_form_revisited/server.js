var express = require("express");
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
const server = app.listen(5000);
const io = require('socket.io')(server);
app.use(express.static(__dirname + '/views'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {

    res.render('form')
});

app.post('/process', function(req, res) {
    res.render('result', { 'data': req.body });
});

io.on('connection', function(socket) {

    socket.on('posting_form', function(data) {
        var number = Math.floor(Math.random() * 10000) + 1;
        socket.emit('updated_message', { msg: data.data }); //3
        socket.emit('random_number', { num: 'You lucky number is ' + number });
    });



});