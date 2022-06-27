import express, { Request, Response } from 'express'
import helmet from 'helmet'
import compression from 'compression'

import { getQuotesByAuthorPagination } from './../src/crawler'
import { HttpCodes } from '../types'

const app = express()
app.use(helmet())
app.disable('x-powered-by')
app.use(compression())

app.get('/api', async (req: Request, res: Response) => {
  res.json({
    availableEndpoints: ['author-pagination'],
    code: HttpCodes.OK
  })
})

app.get('/api/author-pagination', async (req: Request, res: Response) => {
  try {
    const { query } = req

    if (!query.author || typeof query.author !== 'string') {
      res.json({
        message: 'Error: Author not provided in Query params',
        code: HttpCodes.BAD_REQUEST
      })

      return
    }

    const paginationData = await getQuotesByAuthorPagination(query.author)

    res.json({
      author: query.author,
      numberOfPages: paginationData?.numberOfPages || 0,
      code: HttpCodes.OK
    })
  }
  catch (e) {
    res.json({
      message: 'Error: something unexpected happened',
      code: HttpCodes.BAD_REQUEST
    })
  }
})

module.exports = app
