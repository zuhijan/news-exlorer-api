const mongoose = require('mongoose');
const Article = require('../models/article');

const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const SuccesError = require('../errors/succes-err');


function objectIdValid(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NotFoundError('Нет статьи с таким id');
  }
}


module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const owner = req.user._id;
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.send({ data: article }))
    .catch(next);
};

module.exports.removeArticleById = (req, res, next) => {
  const owner = req.user._id;
  const { articleId } = req.params;

  objectIdValid(articleId);

  Article.findById(articleId)
    .then((article) => {
      if (article) {
        if (owner === article.owner.toString()) {
          Article.findByIdAndRemove(articleId)
            .then(() => {
              throw new SuccesError('Статья удалена');
            })
            .catch(next);
        } else {
          throw new ForbiddenError('Недостаточно прав');
        }
      } else {
        throw new NotFoundError('Такой статьи не существует');
      }
    })
    .catch(next);
};
