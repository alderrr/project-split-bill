const { hashPassword, comparePassword } = require("../helpers/bcrypt");

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw {
          message: "Email is required",
        };
      }
      if (!password) {
        throw {
          message: "Password is required",
        };
      }
      // Check existing user inside database
      const existingUser = await req.db.collection("users").findOne({ email });
      if (existingUser) {
        throw {
          message: "Email already used",
        };
      }
      // Create new user paylaod
      const newUser = {
        email: email,
        password: hashPassword(password),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await req.db.collection("users").insertOne(newUser);
      res.status(201).json({
        message: "User registered successfully",
      });
    } catch (error) {
      console.log(error, "UserController - register");
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
    } catch (error) {
      console.log(error, "UserController - login");
      next(error);
    }
  }
  static async modify(req, res, next) {
    try {
      const { email, password } = req.body;
    } catch (error) {
      console.log(error, "UserController - modify");
    }
  }
  static async remove(req, res, next) {
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
      console.log(error, "UserController - remove");
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
