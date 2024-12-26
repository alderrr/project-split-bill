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
}

module.exports = UserController;
