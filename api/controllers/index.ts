import { Request, Response } from 'express'

import { getQuotesByAuthorPagination, getQuotesByAuthor } from '@crawler'
import { HttpCodes } from '@custom-types'

const errorResponse = {
  message: 'Error: something unexpected happened',
  code: HttpCodes.BAD_REQUEST
}

export async function getApiRoot(req: Request, res: Response) {
  res.json({
    availableEndpoints: ['author-pagination', 'author-quotes'],
    code: HttpCodes.OK
  })
}

export async function getAuthorPagination(req: Request, res: Response) {
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
}

export async function getAuthorQuotes(req: Request, res: Response) {
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
      page: query.page,
      quotes: quotesData,
      code: HttpCodes.OK
    })
  }
  catch (e) {
    res.json(errorResponse)
  }
}
