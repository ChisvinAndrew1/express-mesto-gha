const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const NotValidateData = require('../errors/NotValidateData');
const SomeError = require('../errors/SomeError');
const User = require('../models/user');

const CONFLICT_KEY_CODE = 11000;
const SALT_ROUNDS = 10;

function getUsers(_req, res, next) {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => next(new SomeError()));
}

function getUserById(req, res, next) {
  User.findById(req.params.id)

    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Переданы некорректные данные при удалении карточки'));
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      if (err.kind === 'ObjectId') {
        return next(new NotValidateData('Пользователь по указанному _id не найден'));
      }
      return next(new SomeError());
    });
}

function createUser(req, res, next) {
  const {
    name, about, avatar, email, password,
  } = req.body;
  console.log(req.body);
  bcryptjs.hash(password, SALT_ROUNDS)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new NotValidateData('Переданы некорректные данные при создании профиля'));
      } if (err.code === CONFLICT_KEY_CODE) {
        return next(new ConflictError('Пользователь с таким Email уже создан'));
      }
      return next(new SomeError());
    });
}

function updateProfileAvatar(req, res, next) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Переданы некорректные данные при обновлении аватара'));
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new NotValidateData('Пользователь по указанному _id не найден'));
      }
      return next(new SomeError());
    });
}

function updateProfile(req, res, next) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    name,
    about,
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new NotValidateData('Переданы некорректные данные при обновлении профиля'));
      } if (err.kind === 'ObjectId') {
        return next(new NotFoundError('Пользователь по указанному _id не найден'));
      }
      return next(new SomeError());
    });
}

function login(req, res, next) {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jsonwebtoken.sign({ _id: user._id }, 'some-secret-salt', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ token });
    })
    .catch(next);
}

function getMeInfo(req, res, next) {
  const { _id } = req.user;
  User.find({ _id })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return res.status(201).send(user);
    })
    .catch(next);
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateProfileAvatar,
  login,
  getMeInfo,
};
