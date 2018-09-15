const randomize = require('randomatic')

const TokenStorage = Parse.Object.extend('TokenStorage')

const restrictedAcl = new Parse.ACL()
restrictedAcl.setPublicReadAccess(false)
restrictedAcl.setPublicWriteAccess(false)

const upsertGitHubUser = function(githubData) {
  var query = new Parse.Query(TokenStorage)
  query.equalTo('githubId', githubData.id)
  query.ascending('createdAt')
  return query.first({ useMasterKey: true }).then(function(tokenData) {
    if (!tokenData) {
      return newGitHubUser(githubData)
    }

    const user = tokenData.get('user')
    return user
      .fetch({ useMasterKey: true })
      .then(user => {
        if (githubData.accessToken !== tokenData.get('accessToken')) {
          tokenData.set('accessToken', githubData.accessToken)
        }

        return tokenData.save(null, { useMasterKey: true }).then(() => user)
      })
      .then(user => {
        const password = randomize('*', 10)
        user.setPassword(password)
        return user.save(null, { useMasterKey: true }).then(user => {
          return Parse.User.logIn(user.get('username'), password)
        })
      })
      .then(user => user)
  })
}

const newGitHubUser = function(githubData) {
  const user = new Parse.User()
  user.set('username', githubData.username)
  user.set('email', githubData.email)
  user.set('password', randomize('*', 10))

  return user
    .signUp()
    .then(function(user) {
      const ts = new TokenStorage()
      ts.set('githubId', githubData.id)
      ts.set('githubLogin', githubData.username)
      ts.set('accessToken', githubData.accessToken)
      ts.set('user', user)
      ts.setACL(restrictedAcl)
      return ts.save(null, { useMasterKey: true })
    })
    .then(() => {
      return upsertGitHubUser(githubData)
    })
}

function github(req, res) {
  const profile = req.user
  const email = profile.emails && profile.emails[0] && profile.emails[0].value
  const photo = profile.photos && profile.photos[0] && profile.photos[0].value

  if (!(email && profile.username && profile.id)) {
    res.render('error', { errorMessage: 'Invalid github data' })
    return
  }

  upsertGitHubUser(profile)
    .then(user => {
      res.render('store_auth', { sessionToken: user.getSessionToken() })
    })
    .catch(error => {
      res.render('error', { errorMessage: JSON.stringify(error) })
    })
}

module.exports = github
