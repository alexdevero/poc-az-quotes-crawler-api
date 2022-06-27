import express, { Request, Response } from 'express'
import helmet from 'helmet'
import compression from 'compression'

import { getQuotesByAuthorPagination } from './../src/crawler'

const app = express()
app.use(helmet())
app.disable('x-powered-by')
app.use(compression())

app.get('/api', async (req: Request, res: Response) => {
  res.json({
    message: 'hello'
  })
})

app.get('/api/author-pagination', async (req: Request, res: Response) => {
  try {
    const { params } = req
    const paginationData = await getQuotesByAuthorPagination(params.author)

    res.json({
      author: params.author,
      numberOfPages: paginationData?.numberOfPages || 0
    })
  }
  catch (e) {
    res.json({
      message: 'Sorry'
    })
  }
})

module.exports = app
