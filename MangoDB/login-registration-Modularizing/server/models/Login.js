const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');

var loginSchema = new mongoose.Schema({
    fn: { type: String, required: [true, "first name is required!"], minlength: 2 },
    ln: { type: String, required: [true, "last name is required!"], minlength: 2 },
    em: {
        type: String,
        trim: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    birth: { type: Date, required: [true, "birthday is required!"] },
    pw: { type: String, required: [true, "password is required!"], minlength: [8, 'password should at least 8 charater'] }
}, { timestamps: true });


module.exports = mongoose.model("Login", loginSchema);