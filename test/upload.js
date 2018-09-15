const Parse = require('parse/node')

Parse.initialize('myAppId', 'myJavaScriptKey')
Parse.serverURL = 'http://localhost:1337/parse'

const base64 = 'V29ya2luZyBhdCBQYXJzZSBpcyBncmVhdCE='
const base64File = new Parse.File('myfile.txt', { base64: base64 })

base64File
  .save()
  .then(console.log)
  .catch(console.log)

const bytes = [0xbe, 0xef, 0xca, 0xfe]
const bytesFile = new Parse.File('myfile.txt', bytes)

bytesFile
  .save()
  .then(console.log)
  .catch(console.log)
