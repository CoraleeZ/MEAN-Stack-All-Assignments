var fs = require('fs')
var path = require('path');
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/basic_mongoose');
// create a variable that points to the models folder
var models_path = path.join(__dirname, './../models');
// read all of the files in the models_path and require (run) each of the javascript files

module.exports = function() {
    const imports = {};
    fs.readdirSync(models_path).forEach(function(file) {
        if (file.indexOf('.js') >= 0) {
            let idx = file.indexOf('.');
            let key = file.slice(0, idx);
            imports[key] = require(models_path + '\\' + file);
        }
        console.log('looping')
    })
    return imports;
}