import axios from 'axios'
import * as cheerio from 'cheerio'

import { urls } from '@data'

export const getQuotesByAuthorPagination = async (authorStartingLetter: string) => {
  try {
    const reUrl = `${urls.authorSingle}${authorStartingLetter.toLowerCase()}/`
    const { data } = await axios.get(reUrl)
    const $ = cheerio.load(data)

    const paginationItems = $('.table + .pager li')

    const pages: number[] = []
    paginationItems.each((i, page) => {
      const pageText = $(page).children('a').text()

      if (pageText.match(/\d+/gi)) {
        pages.push(parseInt(pageText))
      }
    })

    return {
      pages,
    }
  }
  catch (e) {
    console.error(e)
  }
}
