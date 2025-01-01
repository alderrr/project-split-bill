const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken, verifyToken } = require("../helpers/jwt");

class UserController {
  static async registerUser(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { message: "Email is required" };
      }
      if (!password) {
        throw { message: "Password is required" };
      }
      // Check existing user inside database
      const foundUser = await req.db.collection("users").findOne({ email });
      if (foundUser) {
        throw { message: "Email already used" };
      }
      // Create new user payload
      const newUser = {
        email: email,
        password: hashPassword(password),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await req.db.collection("users").insertOne(newUser);
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.log(error, "UserController - registerUser");
      next(error);
    }
  }

  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { message: "Email is required" };
      }
      if (!password) {
        throw { message: "Password is required" };
      }
      const foundUser = await req.db.collection("users").findOne({ email });
      if (!foundUser) {
        throw { message: "Invalid Email/Password" };
      }
      const isPasswordValid = comparePassword(password, foundUser.password);
      if (!isPasswordValid) {
        throw { message: "Invalid Email/Password" };
      }
      const access_token = signToken({
        _id: foundUser._id,
        email: foundUser.email,
      });
      res.status(200).json({ access_token: access_token });
    } catch (error) {
      console.log(error, "UserController - loginUser");
      next(error);
    }
  }

  static async editUser(req, res, next) {
    try {
      const { email, password } = req.body;
    } catch (error) {
      console.log(error, "UserController - editUser");
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { email } = req.body;
      if (!email) {
        throw {
          message: "Email is required",
        };
      }
      // Check existing user inside database
      const existingUser = await req.db.collection("users").findOne({ email });
      if (!existingUser) {
        throw {
          message: "User not found",
        };
      }
      await req.db.collection("users").deleteOne({ email });
      res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      console.log(error, "UserController - deleteUser");
      next(error);
    }
  }

  static async test(req, res, next) {
    try {
      res.status(200).json({
        message: "Connected to localhost:3000",
      });
    } catch (error) {
      console.log(error, "UserController  - test");
      next(error);
    }
  }
}

module.exports = UserController;
