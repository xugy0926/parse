const express = require('express')
const passport = require('passport')

const { verifyGithub } = require('./middleware/github')
const github = require('./controllers/github')
const router = express.Router()

const authenticate = passport.authenticate('github', { failureRedirect: '/login' })

router.get('/login', (req, res) => {
  res.render('login', {})
})

router.get('/user', (req, res) => {
  res.render('user', {})
})

router.get('/authorize', verifyGithub, authenticate)
router.get('/oauthCallback', verifyGithub, authenticate, github)

router.get('/livequery', (req, res) => {
  res.render('livequery')
})

module.exports = router
