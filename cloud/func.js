Parse.Cloud.define('hello', function(req) {
  return 'world'
})

Parse.Cloud.define('upload', function(req) {
  console.log(req)
  console.log(req.files)
  return 'world'
})

Parse.Cloud.define('getPosts', function(req) {
  const query = new Parse.Query('Post')
  query.equalTo('title', 'title')
  return query.find()
})

Parse.Cloud.afterSave('Post', function(req) {
  console.log('after save post...')
})

Parse.Cloud.define('getUser', function(request, response) {
  if (!request.user) {
    return 'Must be logged in.'
  }

  const TokenStorage = Parse.Object.extend('TokenStorage')
  const query = new Parse.Query(TokenStorage)
  query.equalTo('user', request.user)
  query.ascending('createdAt')
  return query
    .first({ useMasterKey: true })
    .then(function(tokenData) {
      if (!tokenData) {
        return Promise.reject('No GitHub data found.')
      }

      return Parse.Cloud.httpRequest({
        method: 'GET',
        url: 'https://api.github.com/user',
        params: { access_token: tokenData.get('accessToken') },
        headers: {
          'User-Agent': 'Parse.com Cloud Code'
        }
      })
    })
    .then(userDataResponse => {
      return userDataResponse.data
    })
})
