const UserController = require("../controllers/userController");
const router = require("express").Router();
const authentication = require("../middlewares/authentication");

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);

router.use(authentication);

router.get("/", UserController.test);
router.get("/user/all", UserController.getAllUser);
router.post("/user/edit", UserController.editUser);
router.get("/user/delete", UserController.deleteUser);

module.exports = router;
