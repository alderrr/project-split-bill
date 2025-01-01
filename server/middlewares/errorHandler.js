const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";

  if (err.message === "Invalid token") {
    status = 401;
    message = "Invalid token";
  }

  res.status(status).json({
    message,
  });
};

module.exports = errorHandler;
