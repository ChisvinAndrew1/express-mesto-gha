const NotFoundError = require('../errors/NotFoundError');
const NotValidateData = require('../errors/NotValidateData');
const SomeError = require('../errors/SomeError');
const User = require('../models/user');

function getUsers(_req, res, next) {
  User.find({})
    .then((users) => {
      if (!users) {
        return next(new NotValidateData('Переданы некорректные данные при создании пользователя'));
      }
      return res.status(200).send(users);
    })
    .catch(() => next(new SomeError()));
}

function getUserById(req, res, next) {
  User.findById(req.params.id)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new NotFoundError('Пользователь по указанному _id не найден'));
      }
      return next(new SomeError());
    });
}

function createUser(req, res, next) {
  const { name, about, avatar } = req.body;
  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new NotValidateData('Переданы некорректные данные при создании профиля'));
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
        return next(new NotValidateData('Переданы некорректные данные при обновлении аватара'));
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new NotFoundError('Пользователь по указанному _id не найден'));
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

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateProfileAvatar,
};
