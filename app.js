const express = require('express');
const mongoose = require('mongoose');
const NotFoundError = require('./errors/NotFoundError');
const { errorHandler } = require('./midllewars/errorHandler');
// const router = require('./routers/users');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb');
const { PORT = 3000 } = process.env;

console.log('ghsjkd');
app.use((req, _, next) => {
  req.user = {
    _id: '628d4eec5b8c30c48a843356',
  };
  next();
});
app.use('/', require('./routers/users'));
app.use('/', require('./routers/cards'));

app.all('*', (_req, _res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorHandler);
app.listen(PORT);
