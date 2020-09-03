const User = require('../models/users.modal')

const Joi = require('@hapi/Joi')

const schemaUser = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    username: Joi.string()
        .required()
        .empty()
        .min(5)
        .max(20)
        .messages({
            "string.base": `"username" should be a type of 'text'`,
            "string.empty": `"username" cannot be an empty field`,
            "string.min": `username should have a minimum length of {#limit}`,
            "string.max": `"username" should have a maximum length of {#limit}`,
            "any.required": `"username" is a required field`
        })
})

module.exports.getUsers = (req, res, next) => {
    User.find()
        .then((user) => res.json(user))
        .catch((err) => console.log(err))
    // res.render('user');
}

module.exports.postUser = async (req, res, next) => {

    let options = { abortEarly: false };
    const validation = schemaUser.validate(req.body, options)

    if (validation.error) return res.status(400).send(validation.error.details)

    let emailExist = await User.findOne({ email: req.body.email })
    console.log(emailExist);
    if (emailExist) return res.status(400).send('Email already Exist')

    let usernameExist = await User.findOne({ username: req.body.username })
    console.log(usernameExist);
    if (usernameExist) return res.status(400).send('Username already Exist')

    const user = new User({
        email: req.body.email,
        username: req.body.username
    })

    user.save()
        .then(() => res.status(200).send('done'))
        .catch(err => res.status(400).json('error' + err))

}