const routerArticles = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getArticles, createArticle, removeArticleById,
} = require('../controllers/articles');


routerArticles.get('/', getArticles);
routerArticles.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().max(150)
      .uri({ allowRelative: true }),
    image: Joi.string().required().max(150)
      .uri({ allowRelative: true }),
  }),
}), createArticle);
routerArticles.delete('/:articleId', removeArticleById);

module.exports = routerArticles;
