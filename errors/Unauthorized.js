class Unauthorized extends Error {
  constructor(message = 'Необходима авторизация') {
    super(message);
    this.name = 'Unauthorized';
    this.statusCode = 401;
  }
}

module.exports = Unauthorized;
