class Unauthorized extends Error {
  constructor(message = 'Данные не валидны') {
    super(message);
    this.name = 'Unauthorized';
    this.statusCode = 401;
  }
}

module.exports = Unauthorized;