const { signToken, verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    let access_token = req.headers.authorization;
    if (!access_token) {
      throw { message: "Invalid token" };
    }
    access_token = access_token.split(" ")[1];
    const verified = verifyToken(access_token);
    const foundUser = await req.db
      .collection("users")
      .findOne({ email: verified.email });
    if (!foundUser) {
      throw { message: "Invalid token" };
    }
    req.user = {
      _id: foundUser._id,
      email: foundUser.email,
    };
    next();
  } catch (error) {
    console.log(error, "authentication");
    next(error);
  }
};

module.exports = authentication;
