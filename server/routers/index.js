const UserController = require("../controllers/userController");
const router = require("express").Router();
const authentication = require("../middlewares/authentication");

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);

router.use(authentication);

router.get("/", UserController.test);
router.post("/user/:id/edit", UserController.editUser);
router.post("/user/:id/delete", UserController.deleteUser);

module.exports = router;
