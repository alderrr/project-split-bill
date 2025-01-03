const errorHandler = (err, req, res, next) => {
  //! Status Code 500
  let status = 500;
  let message = "Internal Server Error";

  console.log(err.message);

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
    if (err.message === "Bill not found") {
      status = 404;
      message = "Bill not found";
    }
  }

  // JsonWebTokenError
  if (err.name === "JsonWebTokenError") {
    if (err.message === "invalid signature") {
      status = 401;
      message = "Invalid token";
    }
  }

  // BSONError
  if (err.name === "BSONError") {
    if (
      err.message ===
      "input must be a 24 character hex string, 12 byte Uint8Array, or an integer"
    )
      status = 400;
    message = "Invalid ID";
  }

  // Response
  res.status(status).json({
    message,
  });
};

module.exports = errorHandler;
