const express = require('express')
const ParseServer = require('parse-server').ParseServer
const ParseDashboard = require('parse-dashboard')

const config = require('config')

const port = 1337
const appName = process.env.APP_NAME || 'My Parse Server App'
const mountPath = process.env.MOUNT_PATH || '/parse'
const dashboardPath = process.env.DASHBOARD_PATH || '/dashboard'
const databaseURI = process.env.DATABASE_URI || 'mongodb://localhost:27017/dev'
const cloud = process.env.CLOUD_CODE_MAIN || '/parse/cloud/main.js'
const appId = process.env.APP_ID || 'myAppId'
const restKey = process.env.REST_KEY || 'myRestKey'
const masterKey = process.env.MASTER_KEY || 'myMasterKey'
const fileKey = process.env.FILE_KEY || 'optionalFileKey'
const serverURL = process.env.SERVER_URL || `http://localhost:${port}/parse`

const api = new ParseServer({
  databaseURI,
  appId,
  restKey,
  masterKey,
  fileKey,
  serverURL,
  cloud
})

const dashboard = new ParseDashboard(
  {
    apps: [
      {
        appName,
        serverURL,
        appId,
        masterKey,
        restKey
      }
    ],
    users: config.get('users'),
    useEncryptedPasswords: config.get('useEncryptedPasswords')
  },
  { allowInsecureHTTP: true }
)

const app = express()
const httpServer = require('http').createServer(app)

app.use(mountPath, api)
app.use(dashboardPath, dashboard)
httpServer.listen(port)
