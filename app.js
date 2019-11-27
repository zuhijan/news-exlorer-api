require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');


const routerUsers = require('./routes/users');
const routerArticles = require('./routes/articles');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorsCentr = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/newsdatab', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// eslint-disable-next-line no-console
console.log(process.env.NODE_ENV);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);
app.use(auth);
app.use('/users', routerUsers);
app.use('/articles', routerArticles);

app.use(errorLogger);
app.use(errors());
app.use(errorsCentr);

app.get('/:someRequest', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
app.listen(PORT);
