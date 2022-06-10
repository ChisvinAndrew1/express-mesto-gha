const express = require('express');
const { celebrate, Joi, errors } = require('celebrate');

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');
const { auth } = require('./midllewars/auth');
const { errorHandler } = require('./midllewars/errorHandler');

const app = express();
app.use(express.json());
app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/mestodb');
const { PORT = 3000 } = process.env;

console.log('ghsjkd');

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.use(auth);

app.use('/users', require('./routers/users'));
app.use('/', require('./routers/cards'));

app.all('*', (_req, _res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});
app.use(errors());
app.use(errorHandler);
app.listen(PORT);
