const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secrets");

const isProduction = process.env.NODE_ENV === "production";

function generateToken(user) {
  const expiresIn = isProduction? "1d": "365d"
  const payload = {
      subject: user.id,
      email: user.email
  };
  const options = {
      expiresIn
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = generateToken