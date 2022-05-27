class SomeError extends Error {
  constructor(message = 'Произошла ошибка') {
    super(message);
    this.name = 'SomeError';
    this.statusCode = 500;
  }
}

module.exports = SomeError;
