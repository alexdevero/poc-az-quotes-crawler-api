import express, { Request, Response } from 'express'
import helmet from 'helmet'
import compression from 'compression'

import { getQuotesByAuthorPagination, getQuotesByAuthor } from './../src/crawler'
import { HttpCodes } from '../types'

const errorResponse = {
  message: 'Error: something unexpected happened',
  code: HttpCodes.BAD_REQUEST
}

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
      res.json(errorResponse)

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
    res.json(errorResponse)
  }
})

app.get('/api/author-quotes', async (req: Request, res: Response) => {
  try {
    const { query } = req

    if (!query.author || typeof query.author !== 'string') {
      res.json(errorResponse)

      return
    }

    let page: string | undefined = undefined
    if (query.page && typeof query.page === 'string') {
      page = query.page
    }

    const quotesData = await getQuotesByAuthor(query.author, page)

    res.json({
      author: query.author,
      quotes: quotesData,
      code: HttpCodes.OK
    })
  }
  catch (e) {
    res.json(errorResponse)
  }
})

module.exports = app
