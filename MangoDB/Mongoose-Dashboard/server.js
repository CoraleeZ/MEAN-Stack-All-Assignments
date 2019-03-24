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
var AnimalSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 20 },
    info: { type: String, required: true, maxlength: 200 },
    pic: Buffer
}, { timestamps: true })
mongoose.model('Animal', AnimalSchema);
var Animal = mongoose.model('Animal');
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
//////upload files
var multer = require('multer');
var upload = multer({
    storage: multer.diskStorage({

        destination: function(req, file, callback) { callback(null, './static/images'); },
        filename: function(req, file, callback) { callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); }

    }),

    fileFilter: function(req, file, callback) {
        var ext = path.extname(file.originalname)
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback( /*res.end('Only images are allowed')*/ null, false)
        }
        callback(null, true)
    }
});
///



app.get('/', function(req, res) {
    Animal.find({}, function(err, animals) {
        if (err) {
            console.log('something went wrong', err);
            for (var key in err.errors) {
                req.flash('an', err.errors[key].message);
            }
            res.render('index', { data: 'null' });
        } else {
            console.log('successfully display all animals!');
            var data = animals;
            res.render('index', { data: data });
        }
    });
});


app.get('/mongooses/new', function(req, res) {
    console.log('go to add new page')
    res.render('form')
});

app.get('/displayone/:id', function(req, res) {
    var id = req.params.id;
    Animal.findOne({ _id: id }, function(err, animal) {
        console.log(animal)
        if (err) {
            console.log('something went wrong', err);
            for (var key in err.errors) {
                req.flash('an', err.errors[key].message);
            }
            res.render('onanimal');
        } else {
            console.log('successfully display one animal!');
            var data = animal;
            res.render('onanimal', { data: data });
        }
    })
})



app.post('/mongooses', upload.any(), function(req, res) {

    console.log("req.body"); //form fields
    console.log(req.body);
    console.log("req.file");
    console.log(req.files[0].filename); //form files

    if (!req.body && !req.files) {
        res.json({ success: false });
    } else {
        // var c;
        // Detail.findOne({}, function(err, data) {
        //     console.log("into detail");

        //     if (data) {
        //         console.log("if");
        //         c = data.unique_id + 1;
        //     } else {
        //         c = 1;
        //     }

        var animal = new Animal({

            // unique_id: c,
            name: req.body.name,
            info: req.body.info,
            pic: req.files[0].filename
        });

        animal.save(function(err, an) {
            if (err)
                console.log(err);
            else
                res.redirect('/');

        });

        // }).sort({ _id: -1 }).limit(1);
    }

});


app.get('/edit/:id', function(req, res) {
    var id = req.params.id;
    Animal.findOne({ _id: id }, function(err, animal) {
        if (err) {
            console.log('something went wrong', err);
            for (var key in err.errors) {
                req.flash('an', err.errors[key].message);
            }
            res.render('edit', { data: 'null' });
        } else {
            console.log('go to edit page!');
            var data = animal;
            res.render('edit', { data: data });
        }
    })
})

app.post('/update', upload.any(), function(req, res) {
    console.log(req.body)
    var id = req.body.id;
    Animal.findOne({ _id: id }, function(err, animal) {
        if (err) {
            console.log('something went wrong', err);
            for (var key in err.errors) {
                req.flash('an', err.errors[key].message);
            }
            res.render('edit', { data: 'null' });
        } else {
            animal.name = req.body.name;
            animal.info = req.body.info;
            animal.pic = req.files[0].filename;
            animal.save(function(err) {
                if (err) {
                    console.log('something went wrong', err);
                    for (var key in err.errors) {
                        req.flash('an', err.errors[key].message);
                    }
                    res.render('edit', { data: 'null' });
                } else {
                    console.log('successfully edited a animal!');
                    res.redirect('/');
                }
            })
        }
    })

})


app.post('/destroy/:id', function(req, res) {
    var id = req.params.id;
    Animal.remove({ _id: id }, function(err) {
        console.log(err)
    });
    res.redirect('/')
})