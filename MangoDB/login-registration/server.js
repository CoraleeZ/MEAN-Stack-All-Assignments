var express = require("express");
var app = express();
///
var bodyParser = require('body-parser');
const server = app.listen(5000);
const io = require('socket.io')(server);
///
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
///
var bcrypt = require('bcrypt')

///create a new database
mongoose.connect('mongodb://localhost/basic_mongoose');

var loginSchema = new mongoose.Schema({
    fn: { type: String, required: [true, "first name is required!"], minlength: 2 },
    ln: { type: String, required: [true, "last name is required!"], minlength: 2 },
    em: {
        type: String,
        trim: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    birth: { type: Date, required: [true, "birthday is required!"] },
    pw: { type: String, required: [true, "password is required!"], minlength: [8, 'password should at least 8 charater'] }
}, { timestamps: true })


var Login = mongoose.model("Login", loginSchema);

///
var path = require('path');
// app.use(express.static(path.join(__dirname, './static')));
app.use('/static', express.static('static'));
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
///


app.get('/', function(req, res) {
    res.render('index')
})

app.post('/register', function(req, res) {

    console.log(req.body);
    bcrypt.hash(req.body.pw, 10)
        .then(hashed_password => {
            req.body.pw = hashed_password
        })
        .catch(error => {
            console.log('hash throw error----->', err)
        });

    var login = new Login(req.body);
    login.save(function(err, data) {
        if (err) {
            // if there is an error upon saving, use console.log to see what is in the err object 
            console.log("We have an error!", err);
            // adjust the code below as needed to create a flash message with the tag and content you would like
            for (var key in err.errors) {
                req.flash('registration', err.errors[key].message);
            }
            // redirect the user to an appropriate route
            res.redirect('/');
        } else {
            req.session.name = data.fn;
            console.log(data)
            res.render('success', { data: data });
        }
    });

})


app.post('/login', function(req, res) {

    Login.findOne({ em: req.body.em }, function(err, data) {
        if (err) { console.log('login error', err) } else {
            bcrypt.compare(req.body.pw, data.pw)
                .then(result => {
                    console.log('match!!!');
                    req.session.name = data.fn;
                    console.log('data=', data);
                    res.render('success', { data: data });
                })
                .catch(error => {
                    console.log('not match', error)
                });

        }
    });

})

app.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/')
})