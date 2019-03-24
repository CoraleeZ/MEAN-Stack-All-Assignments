///create a new database
var Login = require('../models/Login');
var bcrypt = require('bcrypt');

module.exports = {
    index: (req, res) => {
        res.render('index')
    },


    register: (req, res) => {
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

    },




    login: (req, res) => {
        var password = req.body.pw;
        Login.findOne({ em: req.body.em }, function(err, data) {
            if (err) {
                console.log('login error', err);
                res.redirect('/');
            } else {
                bcrypt.compare(password, data.pw)
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
    },




    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/')
    }




}