const mongoose = require('mongoose');

const Schema = mongoose.Schema

const user = new Schema({
    name: { type: String, required: true },
    image_path: { type: String, required: true },
}, { timestamps: true })

const User = mongoose.model('Users', user);

module.exports = User