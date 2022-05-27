class NotFoundError extends Error {
  constructor(message = 'Данные не найдены') {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
