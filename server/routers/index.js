const UserController = require("../controllers/userController");
const router = require("express").Router();
// const authentication

router.get("/", UserController.test);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/modify", UserController.modify);
router.post("/remove", UserController.remove);

// router.use(authentication)

module.exports = router;
