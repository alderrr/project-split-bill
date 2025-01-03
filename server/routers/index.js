const UserController = require("../controllers/userController");
const BillController = require("../controllers/billController");
const router = require("express").Router();
const authentication = require("../middlewares/authentication");

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);

router.use(authentication);

router.get("/", UserController.test);
router.get("/user/all", UserController.getUsers);
router.post("/user/edit", UserController.editUser);
router.get("/user/delete", UserController.deleteUser);

router.post("/bill/add", BillController.addBill);
router.get("/bill/all", BillController.getAllBill);
router.get("/bill/:id", BillController.getOneBill);
router.post("/bill/:id/edit", BillController.editBill);
router.post("/bill/:id/delete", BillController.deleteBill);

module.exports = router;
