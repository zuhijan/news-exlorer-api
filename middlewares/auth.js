const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');


const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  console.log(`try auth: ${req.cookies.jwt}`);

  if (!req.cookies.jwt) {
    throw new AuthError('Необходима авторизация!');
  }
  const token = req.cookies.jwt;
  let payload;


  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    throw new AuthError('Необходима авторизация!');
  }
  req.user = payload;
  next();
};
