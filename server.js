const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(logger('dev'))
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/about', (req, res) => {
  res.render('about')
})

const todoRoutes = require('./routes/todo-routes')
app.use('/todo', todoRoutes)

app.use('*', (req, res) => {
  res.status(404).send('Not Found')
})

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({err, message: err.message})
})
