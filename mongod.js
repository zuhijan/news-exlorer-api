const mongoose = require('mongoose');

const { DB_ADRESS } = process.env;

mongoose.connect(DB_ADRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Mondodb connected');
});
