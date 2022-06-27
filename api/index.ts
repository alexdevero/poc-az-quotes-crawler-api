import express, { Request, Response } from 'express'
import helmet from 'helmet'
import compression from 'compression'

const app = express()
app.use(helmet())
app.disable('x-powered-by')
app.use(compression())

app.get('/api', async (req: Request, res: Response) => {
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
  res.json({
    message: 'hello'
  })
})

module.exports = app
