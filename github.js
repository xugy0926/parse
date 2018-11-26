const config = require('config')
const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy
const authenticate = passport.authenticate('github', { failureRedirect: '/login' })
const randomize = require('randomatic')

function auth(req, res, next) {
  passport.serializeUser(function(user, done) {
    done(null, user)
  })

  passport.deserializeUser(function(user, done) {
    done(null, user)
  })

  passport.use(
    new GitHubStrategy(config.get('github'), function(accessToken, refreshToken, profile, done) {
      profile.accessToken = accessToken
      done(null, profile)
    })
  )

  passport.initialize()(req, res, next)
}

const TokenStorage = Parse.Object.extend('TokenStorage')

const restrictedAcl = new Parse.ACL()
restrictedAcl.setPublicReadAccess(false)
restrictedAcl.setPublicWriteAccess(false)

const newGitHubUser = function(profile) {
  const user = new Parse.User()
  user.set('username', profile.name)
  user.set('email', profile.email)
  user.set('avatar', profile.avatar_url)
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

const upsertGitHubUser = function(profile) {
  const query = new Parse.Query(TokenStorage)
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

const callback = function(req, res) {
  const profile = req.user && req.user._json

  if (!(profile.email && profile.name && profile.id)) {
    res.send('Invalid github data')
    return
  }

  upsertGitHubUser(profile)
    .then(user => {
      res.render('store_auth', { sessionToken: user.getSessionToken() })
    })
    .catch(error => {
      res.send(JSON.stringify(error))
    })
}

module.exports = { auth, authenticate, callback }
