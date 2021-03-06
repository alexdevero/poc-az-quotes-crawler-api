import axios from 'axios'
import * as cheerio from 'cheerio'

import { urls, selectors } from './../../data'

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
      let authorsTables = $(selectors.authorsTables)

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
      let authors = $(selectors.authorsList)
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

    const paginationItems = $(selectors.authorsPagination)

    const pages: number[] = []
    paginationItems.each((i, page) => {
      const pageText = $(page).children('a').text()

      if (pageText.match(/\d+/gi)) {
        pages.push(parseInt(pageText))
      }
    })

    return {
      authors: authorsData,
      pages,
    }
  }
  catch (e) {
    console.error(e)
  }
}
