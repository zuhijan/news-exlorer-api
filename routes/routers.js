
const router = require('express').Router();

const auth = require('../middlewares/auth');
const routerUsers = require('../routes/users');
const routerArticles = require('../routes/articles');
const { createUser, login } = require('../controllers/users');
const { validateLogin, validateCreateUser } = require('../middlewares/celebrate-req-valid');
const NotFoundError = require('../errors/not-found-err');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use(auth);
router.use('/users', routerUsers);
router.use('/articles', routerArticles);
router.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
