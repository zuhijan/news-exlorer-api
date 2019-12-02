const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');

module.exports.getUserById = (req, res, next) => {
  const owner = req.user._id;

  User.findById(owner)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res) => {
  const {
    name, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({ user }))
    .catch(() => res.status(400).send('Пользователь с таким email существует'));
// .catch(next);
};
// TODO: разобраться с валидацией на сервере, как сделать так, чтобы передавался нужный мне текст
// если емэил существует при создании - и при этом работал централизованный обрабочтик
//  ошибок как везде.

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });

      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      })
        .end();
    })
    .catch(next);
};
