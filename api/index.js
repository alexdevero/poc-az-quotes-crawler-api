const app = require('express')

app.get('/api', (req, res) => {
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
  res.json({
    message: 'hello'
  })
})

module.exports = app
