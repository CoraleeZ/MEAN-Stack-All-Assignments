var express = require("express");
var app = express();
///
var bodyParser = require('body-parser');
const server = app.listen(5000);
const io = require('socket.io')(server);
///
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

///create a new database
mongoose.connect('mongodb://localhost/basic_mongoose');
//create a collection 
var QuoteSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 15 },
    quote: { type: String, required: true, maxlength: 100 }
    // created_at: { type: Date, default: Date.now }
}, { timestamps: true })
mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote');
///
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
// express and socket.io share session setting
io.use(function(socket, next) {
    sessionmiddleware(socket.request, socket.request.res, next);
});
////



app.get('/', function(req, res) {
    res.render('index')
});

app.post('/process', function(req, res) {
    var quote = new Quote(req.body);
    console.log(req.body)
    quote.save(function(err) {
        if (err) {
            console.log('something went wrong', err);
            for (var key in err.errors) {
                req.flash('quote', err.errors[key].message);
            }
            res.redirect('/');
        } else {
            console.log('successfully added a quote!');
            res.redirect('/result');
        }
    });

});

app.get('/result', function(req, res) {

    Quote.find({}, function(err, quotes) {
        if (err) {
            console.log('something went wrong' + err);
            for (var key in err.errors) {
                req.flash('quote', err.errors[key].message);
            }
            res.redirect('/');
        } else {
            var data_array = [];
            for (var x in quotes) {
                data_array.unshift(quotes[x]);
            }
            console.log(quotes)
            res.render('result', { data: data_array })
        }
    });
});