import express from 'express'
import helmet from 'helmet'
import compression from 'compression'

// import { getApiRoot, getAuthorPagination, getAuthorQuotes } from './controllers'
import { ApiRouter } from './routes'

const app = express()
app.use(helmet())
app.disable('x-powered-by')
app.use(compression())

app.use('/', ApiRouter)

// app.get('/api', getApiRoot)

// app.get('/api/author-pagination', getAuthorPagination)

// app.get('/api/author-quotes', getAuthorQuotes)

module.exports = app
