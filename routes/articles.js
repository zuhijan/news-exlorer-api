/* eslint-disable quotes */
const routerCards = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getArticles, createArticle, removeArticleById,
} = require('../controllers/articles');


routerCards.get('/', getArticles);
routerCards.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().regex(
      // eslint-disable-next-line no-useless-escape
      /^(http:[\/][\/]|https:[\/][\/])(((\d{1,3}[\.]){3}\d{1,3}([:]\d{2,5})?)[\/]?|(w{3}[\.])?\w+([\.]\w+)?([^www][\.][a-zA-Z]{2,5})([\/]\w+)*(#)?[\/]?)/,
    ),
    image: Joi.string().required().regex(
      // eslint-disable-next-line no-useless-escape
      /^(http:[\/][\/]|https:[\/][\/])(((\d{1,3}[\.]){3}\d{1,3}([:]\d{2,5})?)[\/]?|(w{3}[\.])?\w+([\.]\w+)?([^www][\.][a-zA-Z]{2,5})([\/]\w+)*(#)?[\/]?)/,
    ),
  }),
}), createArticle);
routerCards.delete('/:cardId', removeArticleById);

module.exports = routerCards;
