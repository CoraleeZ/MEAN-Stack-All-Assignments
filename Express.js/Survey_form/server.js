var express = require("express");
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/static'));
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


app.listen(5000)