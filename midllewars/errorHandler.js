module.exports.errorHandler = (err, _req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.log(err);
  res.status(statusCode).send({
    message: err.message,
    code: statusCode,
  });
  next();
};
