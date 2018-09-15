module.exports = {
  users: [
    {
      user: 'user',
      pass: 'pass'
    }
  ],
  useEncryptedPasswords: false,
  emailoptions: {
    fromAddress: '',
    user: '',
    password: '',
    host: '',
    port: 465
  },
  github: {
    signinValid: true,
    clientID: '',
    clientSecret: '',
    callbackURL: 'http://localhost:3000/oauthCallback'
  },
}
