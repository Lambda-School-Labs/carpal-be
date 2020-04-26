const generateToken = require('./generateToken');

(() => {
  const user = { email: "dang@carpal.com", id: 1 }
  global.token = generateToken(user)
})()