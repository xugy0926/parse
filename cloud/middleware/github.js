const config = require('config')
const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy

function githubAuth(req, res, next) {
  if (!config.get('verifyGithubAccount')) {
    return next()
  }

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

function verifyGithub(req, res, next) {
  if (!config.get('verifyGithubAccount')) {
    return next(new Error('Cannot use github account.'))
  }

  next()
}

module.exports = { githubAuth, verifyGithub }
