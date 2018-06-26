var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        unique: true,
    },
    passwordConf: {
        type: String,
        unique: true,
    }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;