const animal = require('../controllers/controllers');
module.exports = function(app) {
    app
        .get('/', animal.index)
        .get('/mongooses/new', animal.new)
        .get('/displayone/:id', animal.displayone)
        .post('/mongooses', animal.mongooses)
        .get('/edit/:id', animal.edit)
        .post('/update', animal.update)
        .get('/destroy/:id', animal.destroy)
}