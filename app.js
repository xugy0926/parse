const express = require('express')
const ParseServer = require('parse-server').ParseServer
const ParseDashboard = require('parse-dashboard')

const config = require('config')

const api = new ParseServer(config.get('parse'))
const dashboard = new ParseDashboard(config.get('dashboard'), { allowInsecureHTTP: true })

const app = express()
const httpServer = require('http').createServer(app)

app.use(config.get('mountPath'), api)
app.use(config.get('dashboardPath'), dashboard)
httpServer.listen(config.get('port'))
ParseServer.createLiveQueryServer(httpServer)
