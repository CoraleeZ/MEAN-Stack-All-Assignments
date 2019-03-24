var express = require("express");
var app = express();
var session = require('express-session');

app.use(express.static(__dirname + '/static'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.get('/', function(req, respond) {
    if (!('count' in req.session)) {
        req.session.count = 0
    }
    req.session.count += 1;
    info = {
        count: req.session.count
    }
    respond.render('index', { 'info': info })
});

app.get('/addtwo', function(req, res) {

    req.session.count += 1;

    res.redirect('/');
});

app.get('/reset', function(req, res) {

    req.session.count = 0;

    res.redirect('/');
});

app.listen(5000)