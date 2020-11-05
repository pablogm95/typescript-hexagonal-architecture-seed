/*
 * Express configuration as REST interactor
 */
const app = require('express')()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const httpStatusCodes = require('http-status-codes')
const routes = require('./routes')
const dependencies = require('../../../dependencies')
const { loggerController: logger } = require('../../../utils/logger')

// Middlewares
app.use(bodyParser.json())
app.use(morgan('dev'))

// Router
// Inyección de dependencias en cascada desde el inicio de la aplicación, en este caso un servidor de express
app.use('/ping', (req, res) => {
  res.status(httpStatusCodes.NO_CONTENT).end()
})
app.use('/', routes(dependencies))


// Listen for requests
const port = 8080
app.listen(port, () => {
  logger.info(`Server is listening on port ${port}`)
})


module.exports = app
