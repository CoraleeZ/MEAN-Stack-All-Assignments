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
mongoose.connect('mongodb://localhost/basic_mongoose2');

var CommentSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required!"], minlength: 2 },
    content: { type: String, required: [true, "Comments can not be empty!"], minlength: 2 },
}, { timestamps: true })

var MessageSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required!"], minlength: 2 },
    content: { type: String, required: [true, "Messages can not be left empty!"], minlength: 2 },
    comments: [CommentSchema]
}, { timestamps: true })

// mongoose.model("Comment", CommentSchema);
// mongoose.model("Message", MessageSchema);

var Comments = mongoose.model("Comment", CommentSchema);
var Messages = mongoose.model("Message", MessageSchema);

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
///



app.get('/', function(req, res) {
    Messages.find({}, function(err, data) {
        if (err) {
            console.log('something went wrong', err);
            for (var key in err.errors) {
                req.flash('mess', err.errors[key].message);
            }
            res.render('index', { data: 'null' });
        } else {
            console.log('successfully display all message!');
            console.log(data)
            res.render('index', { data: data });
        }
    });

    Comments.find({}, function(err, data) {
        if (err) {
            console.log('!!!!!', err)
        } else {
            console.log(data, '&&&&&&&&&&&&&&&&&&&&&&&');
        }
    })
});

app.post('/message', function(req, res) {

    var messageinstance = new Messages(req.body);
    messageinstance.save(function(err) {
        if (err) {
            console.log('problem!!!!!', err)
        } else {
            console.log('NO problem!!!')
        }
    });
    res.redirect('/')
})

app.post('/comment', function(req, res) {
    // var comme = new Comments();
    // comme.name = req.body.name;
    // comme.content = req.body.content;
    // comme.save();
    // Messages.findOne({ _id: req.body.id }, function(err, date) {
    //     console.log(data);
    //     if (err) {
    //         res.redirect('/')
    //     } else {
    //         data.comments.push(comme);
    //     }
    // })


    Comments.create({ name: req.body.name, content: req.body.content }, function(err, comment) {
        if (err) {
            console.log("Something went wrong***", err);
            for (var key in err.errors) {
                req.flash("comment", err.errors[key].message);
            }
            res.redirect('/');
        } else {
            Messages.findOneAndUpdate({ _id: req.body.id }, { $push: { comments: comment } }, function(err, data) {
                if (err) {
                    console.log('%%%%%%5', err);
                    res.redirect('/');
                } else {
                    res.redirect('/');
                }
            });
        }
    });
})