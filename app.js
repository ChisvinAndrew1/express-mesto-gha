// const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
// const { setNoCacheHeaders } = require('./middlewares');
const { PORT = 3000 } = process.env;
app.listen(PORT);
