import axios from 'axios'
import * as cheerio from 'cheerio'

import { urls } from '@data'

export type Author = {
  author: string;
  link?: string;
}

export const getAuthors = async (authorStartingLetter?: string, page?: number) => {
  try {
    const reqUrl = authorStartingLetter ? `${urls.authorSingle}${authorStartingLetter.toLowerCase()}/${authorStartingLetter && ((page || 0) > 1) ? page : ''}` : urls.authors
    const { data } = await axios.get(reqUrl)
    const $ = cheerio.load(data)

    const authorsData: Author[] = []

    if (!authorStartingLetter) {
      let authorsTables = $('.authors-page ul')

      authorsTables.each((i, table) => {
        const item = $(table).children('li')
        item.each((i, it) => {
          const linkEl = $(it).children('a')
          const linkElHref = linkEl.attr()?.href
          const linkElText = linkEl.text()

          if (!linkElText.match(/more/gi)) {
            authorsData.push({
              author: linkElText,
              link: linkElHref?.replace(/\/author\//i, '')
            })
          }
        })
      })
    } else {
      let authors = $('.leftcol-inner .table tbody tr')
      authors.each((i, tr) => {
        const firstTdChild = $(tr).children('td').first().children('a')
        const firstTdChildText = firstTdChild.text()
        const firstTdChildHref = firstTdChild.attr()?.href

        authorsData.push({
          author: firstTdChildText,
          link: firstTdChildHref
        })
      })
    }

    const paginationItems = $('.table + .pager li')

    const pages: number[] = []
    paginationItems.each((i, page) => {
      const pageText = $(page).children('a').text()

      if (pageText.match(/\d+/gi)) {
        pages.push(parseInt(pageText))
      }
    })

    console.log(authorsData)

    return {
      authors: authorsData,
      pages,
    }
  }
  catch (e) {
    console.error(e)
  }
}
