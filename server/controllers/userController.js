const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken, verifyToken } = require("../helpers/jwt");

class UserController {
  static async registerUser(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw new Error("Email is required");
      }
      if (!password) {
        throw new Error("Password is required");
      }
      // Check existing user inside database
      const foundUser = await req.db.collection("users").findOne({ email });
      if (foundUser) {
        throw new Error("Email already used");
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
      next(error);
    }
  }

  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw new Error("Email is required");
      }
      if (!password) {
        throw new Error("Password is required");
      }
      const foundUser = await req.db.collection("users").findOne({ email });
      if (!foundUser) {
        throw new Error("Invalid Email/Password");
      }
      const isPasswordValid = comparePassword(password, foundUser.password);
      if (!isPasswordValid) {
        throw new Error("Invalid Email/Password");
      }
      const access_token = signToken({
        _id: foundUser._id,
        email: foundUser.email,
      });
      res.status(200).json({ access_token: access_token });
    } catch (error) {
      next(error);
    }
  }

  // Temporary (Superuser command)
  static async getUsers(req, res, next) {
    try {
      const allUser = await req.db
        .collection("users")
        .find({}, { projection: { password: 0 } })
        .toArray();
      res.status(200).json({ users: allUser });
    } catch (error) {
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
      const { _id } = req.user;
      const existingUser = await req.db.collection("users").findOne({ _id });
      if (!existingUser) {
        throw new Error("User not found");
      }
      await req.db.collection("users").deleteOne({ _id });
      res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  // Temporary (TESTING)
  static async test(req, res, next) {
    try {
      res.status(200).json({
        message: "Connected to localhost:3000",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
