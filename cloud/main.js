const express = require('express')
const ejsMate = require('ejs-mate')
const bodyParser = require('body-parser')
const githubAuth = require('./middleware/githubAuth')
const router = require('./router')

require('./func')
require('./jobs')

const app = express()

app.set('views', 'cloud/views')
app.set('view engine', 'html');
app.engine('html', ejsMate);
app.locals._layoutFile = 'layout.html';

app.use(bodyParser.json())
app.use(githubAuth())
app.use(router)

app.listen(3000)