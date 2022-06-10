const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const NotValidateData = require('../errors/NotValidateData');
const SomeError = require('../errors/SomeError');
const Card = require('../models/card');

function getCards(_, res, next) {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => next(new SomeError()));
}

function DeleteCardById(req, res, next) {
  Card.findByIdAndRemove(
    req.params.cardId,
    { new: true },
  )
    .orFail(() => next(new NotFoundError('Такой карточки не существует')))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Нельзя удалять чужие карточки'));
      }
      return card.remove()
        .then(() => res.status(200).send({ message: 'Карточка удалена', data: card }));
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'CastError') {
        return next(new NotValidateData('Переданы некорректные данные при удалении карточки'));
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
        return next(err);
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
        return next(new NotFoundError('Отсутствие данных для постановки/снятии лайка'));
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new NotValidateData('Передан несуществующий _id карточки'));
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
