import express, { Request, Response } from 'express'

const app = express()

app.get('/api', (req: Request, res: Response) => {
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
  res.json({
    message: 'hello'
  })
})

module.exports = app
