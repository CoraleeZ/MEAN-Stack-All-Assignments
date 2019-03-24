const controller = require('./controllers');
module.exports = (app) => {
    app
        .get('/api/born', controller.getAll)
        .get('/api/born/new/:name', controller.addNewOne)
        .get('/api/born/remove/:name', controller.delete)
        .get('/api/born/:name', controller.getOneTask)
}