class UserController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
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
      const { email, password } = req.body;
    } catch (error) {
      console.log(error, "UserController - remove");
    }
  }
  static async test(req, res, next) {
    try {
      res.status(200).json({
        message: "Connected to localhost:3000",
      });
    } catch (error) {
      console.log(error, "UserController  - test");
    }
  }
}

module.exports = UserController;
