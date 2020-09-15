const routerSearch = require('./search')
const routerUsers = require('./users')
const routerImage = require('./image')

const router = (app) => {
  app.use('/', routerSearch)

  app.use('/', routerUsers)

  app.use('/', routerImage)
}

module.exports = router;
