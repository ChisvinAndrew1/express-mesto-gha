module.exports.errorHandler = (err, _req, res, next) => {
  console.log(err);
  res.status(err.statusCode).send({
    message: err.message,
    code: err.statusCode,
  });
  next();
};
