const express = require('express');
const mongoose = require('mongoose');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');
const { auth } = require('./midllewars/auth');
// const auth = require('./midllewars/auth');
const { errorHandler } = require('./midllewars/errorHandler');
// const router = require('./routers/users');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb');
const { PORT = 3000 } = process.env;

console.log('ghsjkd');
// app.use((req, _, next) => {
//   req.user = {
//     _id: '628d4eec5b8c30c48a843356',
//   };
//   next();
// });
app.post('/signup', createUser);
app.post('/signin', login);
app.use(auth);

app.use('/users', require('./routers/users'));
app.use('/', require('./routers/cards'));

app.all('*', (_req, _res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorHandler);
app.listen(PORT);
