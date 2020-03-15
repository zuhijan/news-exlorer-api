const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-req-err');

module.exports.getUserById = (req, res, next) => {
  const owner = req.user._id;

  User.findById(owner)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.send({ name: user.name, email: user.email });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send({ name: user.name, email: user.email, id: user._id }))
    .catch(() => {
      next(new BadRequestError('Пользователь с такими данными уже существует'));
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        // domain: 'localhost',
        httpOnly: false,
        sameSite: 'none',
        secure: true,
      });
      res.send({ token });
    })
    // .catch(next);
    .catch(() => {
      next(new BadRequestError('Неверный логин или пароль'));
    });
};
