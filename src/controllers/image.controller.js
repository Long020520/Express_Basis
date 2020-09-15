const Joi = require('@hapi/Joi')
const path = require('path')
const fileType = require('file-type')
const multer = require('multer')
const fs = require('fs')


const ImageModel = require('../models/imageModel.model')

const upload = multer({
    dest: 'images/',
    fileFilter: (req, file, callback) => {
        if (!/\S+\.(jpg|bmp|gif|png)/gi.test(file.originalname)) {
            return callback(Error('Invalid image file name'), false)
        }


        const reqName = req.params.image_name
        ImageModel.find({ name: reqName }).limit(1).exec((err, res) => {
            if (err) {
                console.log(err)
                return callback(err, false)
            }

            if (res.length === 0) callback(null, true)
            else callback(Error(`Image with name: "${reqName}" exists`), false)
        })
    }
}).single('image')


module.exports.postImage = (req, res) => {
    console.log(`Post: req = ${req}`)
    console.log(req.file)
    console.log(req.params)
    upload(req, res, (err) => {
        if (err) {
            res.status(400).json({ message: err.message })
            return
        }

        const reqName = req.body.name
        const imagePath = path.join(req.body.image_path)

        const model = new ImageModel({
            name: reqName,
            image_path: imagePath,

        })

        model.save((err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ message: err.message })
            }

            res.status(200).json({ message: `Uploaded image "${reqName}" successfully` })
        })
    })
}


module.exports.getImage = (req, res) => {
    console.log(`Get: req = ${req}`)
    const start = parseInt(req.query.start) || 0
    const limit = parseInt(req.query.limit) || 20

    ImageModel.find().sort({ created_at: -1 }).skip(start).limit(limit).exec((err, docs) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: err.message, data: null })
        }

        res.status(200).json({
            message: 'Get data successfully',
            data: docs.map(e => e)
        })
    })
}