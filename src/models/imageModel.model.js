const mongoose = require('mongoose');

const Schema = mongoose.Schema

const imageModel = new Schema({
    name: { type: String, required: true },
    image_path: { type: String, required: true },
}, { timestamps: true })

const ImageModel = mongoose.model('ImageModel', imageModel);

module.exports = ImageModel