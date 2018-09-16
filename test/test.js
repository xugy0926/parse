const Parse = require('parse/node')
const randomize = require('randomatic')

Parse.initialize('myAppId', 'myJavaScriptKey')
Parse.serverURL = 'http://localhost:1337/parse'

const username = randomize('*', 5)
const password = randomize('*', 5)
const email = randomize('*', 5) + '@test.com'

describe('User', () => {
  describe('create', () => {
    it('should create a user', () => {
      const user = new Parse.User()
      user.set('username', username)
      user.set('password', password)
      user.set('email', email)
      return user.signUp()
    })
  })

  describe('reset password', () => {
    it('should request password reset', () => {
      return Parse.User.requestPasswordReset(email)
    })
  })
})

describe('Post', () => {
  describe('create', () => {
    it('should create a post', () => {
      const Post = Parse.Object.extend('Post')
      const post = new Post()
      post.set('title', 'test title' + randomize('*', 5))
      post.set('content', 'test content ' + randomize('*', 5))
      return post.save()
    })
  })

  describe('fetch posts', () => {
    it('should get all posts', () => {
      var Post = Parse.Object.extend('Post')
      const query = new Parse.Query(Post)
      return query.find()
    })
  })
})

describe('Upload File', () => {
  describe('base64', () => {
    it('should upload base64', () => {
      const base64 = 'V29ya2luZyBhdCBQYXJzZSBpcyBncmVhdCE='
      const base64File = new Parse.File('myfile.txt', { base64: base64 })
      return base64File.save()
    })
  })

  describe('bytes', () => {
    it('should upload bytes file', () => {
      const bytes = [0xbe, 0xef, 0xca, 0xfe]
      const bytesFile = new Parse.File('myfile.txt', bytes)
      return bytesFile.save()
    })
  })
})
