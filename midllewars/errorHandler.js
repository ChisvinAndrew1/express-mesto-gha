module.exports.errorHandler = (err, _req, res, next) => {
  res.status(err.statusCode).send(err.message);
  console.log(err);
  next();
};
