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
    const { query } = req

    if (!query.author || typeof query.author !== 'string') {
      res.json({
        message: 'Error: Author not provided in Query params',
        code: 500
      })

      return
    }

    const paginationData = await getQuotesByAuthorPagination(query.author)

    res.json({
      author: query.author,
      numberOfPages: paginationData?.numberOfPages || 0,
      code: 200
    })
  }
  catch (e) {
    res.json({
      message: 'Error: something unexpected happened',
      code: 500
    })
  }
})

module.exports = app
