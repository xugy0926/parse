module.exports = {
  port: 1337,
  cloudPort: 13371,
  appName: process.env.APP_NAME || 'My Parse Server App',
  mountPath: process.env.MOUNT_PATH || '/parse',
  dashboardPath: process.env.DASHBOARD_PATH || '/dashboard',
  databaseURI: process.env.DATABASE_URI || 'mongodb://localhost:27017/parse-dev',
  cloud: process.env.CLOUD || `${process.cwd()}/cloud/main.js`,
  appId: process.env.APP_ID || 'myAppId',
  restKey: process.env.REST_KEY || 'myRestKey',
  javascriptKey: process.env.JAVASCRIPT_KEY || 'myJavaScriptKey',
  masterKey: process.env.MASTER_KEY || 'myMasterKey',
  fileKey: process.env.FILE_KEY || 'optionalFileKey',
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',
  email: {
    fromAddress: '',
    user: '',
    password: '',
    host: '',
    port: 465
  },
  github: {
    clientID: '',
    clientSecret: '',
    callbackURL: ''
  },
  monitoringData: ['Post'],
  dashboardUsers: [
    {
      user: 'admin',
      pass: 'pass'
    },
    {
      user: 'user',
      pass: 'pass',
      readOnly: true
    }
  ],
  useEncryptedPasswords: false,
  verifyGithubAccount: false,
  verifyUserEmails: false
}
