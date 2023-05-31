const mongodb = require('./mongo.js')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const expnse = require('./expense.js')
const Summary = require('./Summary.js')

const DB = new mongodb()
const app = express()
const port = 8001 || process.env.PORT

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.listen(port || process.env.PORT, () => {
  console.log(`Server is running on port ${port}`)
})

app.post('/expense', (req, res) => {
  expense = new expnse(DB)
  expense.insertOne(req.body)
  res.send('ok')
})

app.get('/summary', async (req, res) => {
  summary = new Summary(DB)
  const data = await summary.getByMonths()
  res.send(data)
})
