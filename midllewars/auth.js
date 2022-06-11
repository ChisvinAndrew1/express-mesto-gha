const jsonwebtoken = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

function auth(req, _res, next) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized());
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jsonwebtoken.verify(token, 'some-secret-salt');
  } catch (err) {
    return next(new Unauthorized());
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
}

module.exports = {
  auth,
};
