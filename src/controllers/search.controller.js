module.exports.getSearch = (req, res, next) => {
    res.render('search')
}

module.exports.postSearch = (req, res, next) => {
    console.log('body: ', req.body)
    res.send('search')
}

