import axios from 'axios'
import * as cheerio from 'cheerio'

import { selectors, urls } from './../../data'

export const getQuotesByAuthor = async (author: string, page?: string) => {
  try {
    const { data } = await axios.get(`${urls.quotesByAuthor}${author}${page ? '/' + page : ''}`)
    const $ = cheerio.load(data)
    const quotesList = $(selectors.quotesList)

    const quotes: string[] = []
    quotesList.each((i, el) => {
      const quote = $(el).children('div').children('p').children('.title').text()

      if (quote.length > 0) {
        quotes.push(quote)
      }
    })

    return quotes
  }
  catch (e) {
    console.error('error: ', e)
  }
}
