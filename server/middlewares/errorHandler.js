const errorHandler = (err, req, res, next) => {
  //! Status Code 500
  let status = 500;
  let message = "Internal Server Error";

  console.log(err);

  // Error
  if (err.name === "Error") {
    //! Status Code 400
    if (err.message === "Email already used") {
      status = 400;
      message = "Email already used";
    }
    if (err.message === "Email is required") {
      status = 400;
      message = "Email is required";
    }
    if (err.message === "Invalid Email/Password") {
      status = 400;
      message = "Invalid Email/Password";
    }
    if (err.message === "Password is required") {
      status = 400;
      message = "Password is required";
    }
    //! Status Code 401
    if (err.message === "Invalid token") {
      status = 401;
      message = "Invalid token";
    }
    //! Status Code 403

    //! Status Code 404
    if (err.message === "User not found") {
      status = 404;
      message = "User not found";
    }
  }

  // JsonWebTokenError
  if (err.name === "JsonWebTokenError") {
    if (err.message === "invalid signature") {
      status = 401;
      message = "Invalid token";
    }
  }

  // Response
  res.status(status).json({
    message,
  });
};

module.exports = errorHandler;
