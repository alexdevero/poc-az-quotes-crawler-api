import axios from 'axios'
import * as cheerio from 'cheerio'

const url = `https://www.azquotes.com/author/`

export const getQuotesByAuthor = async (author?: string) => {
  try {
    const { data } = await axios.get(`${url}${author ? author : ''}`)
    const $ = cheerio.load(data)
    const quotesList = $('ul.list-quotes li')

    const quotes: string[] = []
    quotesList.each((i, el) => {
      const quote = $(el).children('div').children('p').children('.title').text()

      if (quote.length > 0) {
        quotes.push(quote)
      }
    })

    console.log(quotes)
  }
  catch (e) {
    console.error('error: ', e)
  }
}
