const randomize = require('randomatic')

const TokenStorage = Parse.Object.extend('TokenStorage')

const restrictedAcl = new Parse.ACL()
restrictedAcl.setPublicReadAccess(false)
restrictedAcl.setPublicWriteAccess(false)

const upsertGitHubUser = function(profile) {
  var query = new Parse.Query(TokenStorage)
  query.equalTo('githubId', profile.id)
  query.ascending('createdAt')
  return query.first({ useMasterKey: true }).then(function(tokenData) {
    if (!tokenData) {
      return newGitHubUser(profile)
    }

    const user = tokenData.get('user')
    return user
      .fetch({ useMasterKey: true })
      .then(user => {
        if (profile.accessToken !== tokenData.get('accessToken')) {
          tokenData.set('accessToken', profile.accessToken)
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

const newGitHubUser = function(profile) {
  const user = new Parse.User()
  user.set('username', profile.username)
  user.set('email', profile.email)
  user.set('password', randomize('*', 10))

  return user
    .signUp()
    .then(function(user) {
      const ts = new TokenStorage()
      ts.set('githubId', profile.id)
      ts.set('githubLogin', profile.username)
      ts.set('accessToken', profile.accessToken)
      ts.set('user', user)
      ts.setACL(restrictedAcl)
      return ts.save(null, { useMasterKey: true })
    })
    .then(() => {
      return upsertGitHubUser(profile)
    })
}

function github(req, res) {
  const profile = req.user
  const email = profile.emails && profile.emails[0] && profile.emails[0].value
  // const photo = profile.photos && profile.photos[0] && profile.photos[0].value

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
