var mongoose = require('mongoose');
///create a new database

//create a collection 
var AnimalSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 20 },
    info: { type: String, required: true, maxlength: 200 }
}, { timestamps: true })

module.exports = mongoose.model('Animal-nophoto', AnimalSchema);