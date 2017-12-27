var express = require('express')
var app = express()
var path = require('path')
var ejs = require('ejs')
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname , 'view'))

app.get('/', (req, res) => {
  res.render('index', {})
})

app.listen('9999', () => {
  console.log('🌎Run At 9999')
})
