import axios from 'axios'
import * as cheerio from 'cheerio'

import { urls } from './../../data/'

export const getQuotesByAuthorPagination = async (author: string) => {
  try {
    const reUrl = `${urls.quotesByAuthor}${author}/`
    const { data } = await axios.get(reUrl)
    const $ = cheerio.load(data)

    const paginationItems = $('.pager li')

    const pages: number[] = []
    paginationItems.each((i, page) => {
      const pageText = $(page).children('a').text()

      if (pageText.match(/\d+/gi)) {
        pages.push(parseInt(pageText))
      }
    })

    return {
      numberOfPages: pages.length > 0 ? pages[pages.length - 1] : 0,
    }
  }
  catch (e) {
    console.error(e)
  }
}
