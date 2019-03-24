const { Animal } = require('../config/databass')();
console.log(Animal);

// const Animal = require('../models/Animal');

module.exports = {

    index: (req, res) => {
        console.log('hit index');
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
    },


    new: (req, res) => {
        console.log('go to add new page')
        res.render('form')
    },

    displayone: (req, res) => {
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
    },



    mongooses: (req, res) => {

        var animal = new Animal(req.body);

        animal.save(function(err, an) {
            if (err)
                console.log(err);
            else
                res.redirect('/');

        });
    },


    edit: (req, res) => {
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
    },

    update: (req, res) => {
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

    },


    destroy: (req, res) => {
        var id = req.params.id;
        Animal.remove({ _id: id }, function(err) {
            console.log(err)
        });
        res.redirect('/')
    }
}