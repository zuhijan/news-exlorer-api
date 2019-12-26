require('dotenv').config();
require('./mongod');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const rootRouter = require('./routes/routers');
const errorsCentr = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();
app.use(cors({ credentials: true, origin: 'http://127.0.0.1:8080' }));
app.use(limiter);
app.use(helmet());
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
