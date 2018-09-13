Parse.Cloud.define('hello', function(req) {
  return 'world'
})

Parse.Cloud.job('job', function(req, status) {
  setTimeout(() => {
    console.log('hello, parse')
  }, 10000)
})
