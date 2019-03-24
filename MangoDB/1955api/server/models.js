const mongoose = require('mongoose');
// const connectionString = 'mongodb://localhost/tasks_api';
mongoose.connect('mongodb://localhost/tasks_api', { useNewUrlParser: true });

const BornSchema = new mongoose.Schema({ name: String }, { timestamps: true });

module.exports = mongoose.model('Born', BornSchema);