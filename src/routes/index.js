const routerSearch = require('./search')
const routerUsers = require('./users')

const router = (app) => {
  app.use('/', routerSearch)

  app.use('/', routerUsers)
}

module.exports = router;
