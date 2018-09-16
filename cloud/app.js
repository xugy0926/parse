const bodyParser = require('body-parser')
const ejsMate = require('ejs-mate')
const express = require('express')
const fileUpload = require('express-fileupload')

const githubAuth = require('./middleware/githubAuth')
const router = require('./router')

const app = express()

app.set('views', 'cloud/views')
app.set('view engine', 'html')
app.engine('html', ejsMate)
app.locals._layoutFile = 'layout.html'

app.use(fileUpload())
app.use(bodyParser.json())
app.use(githubAuth())
app.use(router)

app.listen(3000)
