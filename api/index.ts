import express from 'express'
import helmet from 'helmet'
import compression from 'compression'

import { ApiRouter } from './routes'

const app = express()
app.use(helmet())
app.disable('x-powered-by')
app.use(compression())

app.use('/', ApiRouter)

module.exports = app
