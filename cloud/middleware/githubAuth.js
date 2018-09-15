const passport = require('passport')
const config = require('config')
const GitHubStrategy = require('passport-github').Strategy

module.exports = function() {
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

  return passport.initialize()
}
