const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator: (v) => /^(http:[/][/]|https:[/][/])/.test(v),
      message: (props) => `${props.value} Эта строка должна быть ссылкой!`,
    },
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: (v) => /^(http:[/][/]|https:[/][/])/.test(v),
      message: (props) => `${props.value} Эта строка должна быть ссылкой!`,
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});
module.exports = mongoose.model('article', articleSchema);

/* TODO: валидация поле-строк? */
