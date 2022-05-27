const NotFoundError = require('../errors/NotFoundError');
const NotValidateData = require('../errors/NotValidateData');
const SomeError = require('../errors/SomeError');
const Card = require('../models/card');

function getCards(_, res, next) {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        return next(new NotValidateData('Переданы некорректные данные при создании карточки'));
      }
      return res.status(200).send(cards);
    })
    .catch(() => next(new SomeError()));
}

function DeleteCardById(req, res, next) {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new NotFoundError('Передан несуществующий _id карточки'));
      }
      return next(new SomeError());
    });
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({
    name,
    link,
    owner,
  })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.log(err);
        return next(new NotValidateData('Переданы некорректные данные при создании карточки'));
      }
      return next(new SomeError());
    });
}

function updateLikes(req, res, next, method) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { [method]: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotValidateData('Переданы некорректные данные для постановки/снятии лайка'));
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new NotFoundError('Передан несуществующий _id карточки'));
      }
      return next(new SomeError());
    });
}

const likeCard = (req, res, next) => updateLikes(req, res, next, '$addToSet');
const dislikeCard = (req, res, next) => updateLikes(req, res, next, '$pull');

module.exports = {
  getCards,
  DeleteCardById,
  createCard,
  likeCard,
  dislikeCard,
};