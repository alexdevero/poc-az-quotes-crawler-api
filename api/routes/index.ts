import { Router } from 'express'

import { getApiRoot, getAuthorPagination, getAuthorQuotes } from '../controllers'

export const ApiRouter = Router()

ApiRouter.get('/api', getApiRoot)

ApiRouter.get('/api/author-pagination', getAuthorPagination)

ApiRouter.get('/api/author-quotes', getAuthorQuotes)
