const quotes = require('../controllers/quotes');
module.exports = function(app) {
    app
        .get('/', quotes.index)
        .post('/register', quotes.register)
        .post('/login', quotes.login)
        .get('/logout', quotes.logout)
}