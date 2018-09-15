const Parse = require('parse/node')

Parse.initialize('myAppId', 'myJavaScriptKey')
Parse.serverURL = 'http://localhost:1337/parse'

var Post = Parse.Object.extend('Post')
var post = new Post()
post.set('title', 'posttitle')
post.set('content', 'postcontent')
post
  .save()
  .then(console.log)
  .catch(console.log)
