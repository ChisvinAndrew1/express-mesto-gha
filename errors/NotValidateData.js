class NotValidateData extends Error {
  constructor(message = 'Данные не валидны') {
    super(message);
    this.name = 'NotValidateData';
    this.statusCode = 400;
  }
}

module.exports = NotValidateData;
