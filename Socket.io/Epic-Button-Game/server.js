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
    res.render('index')
})
var count = 0;
io.on('connection', function(socket) {

    socket.on('click', function() {
        count += 1;
        io.emit('updateAllClients', { 'data': count })
    })
    socket.on('res', function() {
        count = 0
        io.emit('updateAllClients', { 'data': count })
    })

})