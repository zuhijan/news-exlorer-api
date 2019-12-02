require('dotenv').config();
require('./mongod');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const rootRouter = require('./routes/routers');
const errorsCentr = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(rootRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorsCentr);

app.listen(PORT, () => {
  console.log('App is listening to port ', PORT);
});
