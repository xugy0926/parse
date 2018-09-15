const Parse = require('parse/node')

Parse.initialize('myAppId', 'myJavaScriptKey')
Parse.serverURL = 'http://localhost:1337/parse'

function createUser() {
  var user = new Parse.User()
  user.set('username', 'testuser')
  user.set('password', '1234')
  user.set('email', 'i@xugaoyang.com')

  // other fields can be set just like with Parse.Object
  user.set('phone', '13800000000')
  user
    .signUp()
    .then(console.log)
    .catch(console.log)
}

createUser()

function resetPassword() {
  Parse.User.requestPasswordReset('i@xugaoyang.com')
    .then(console.log)
    .catch(console.log)
}

setTimeout(resetPassword, 2000)
