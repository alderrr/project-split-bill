const UserController = require("../controllers/userController");
const router = require("express").Router();
// const authentication

router.get("/", UserController.test);
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/user/:id/edit", UserController.editUser);
router.post("/user/:id/delete", UserController.deleteUser);

// router.use(authentication)

module.exports = router;
