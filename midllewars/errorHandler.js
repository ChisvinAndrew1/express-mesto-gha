module.exports.errorHandler = (err, _req, res, next) => {
  res.status(err.statusCode).send({
    message: err.message,
    code: err.statusCode,
  });
  next();
};
