const mongoose = require('mongoose');

const Schema = mongoose.Schema

const user = new Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
}, { timestamps: true })

const User = mongoose.model('Users', user);

module.exports = User