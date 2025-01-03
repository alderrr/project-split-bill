const UserController = require("../controllers/userController");
const BillController = require("../controllers/billController");
const SplitteeController = require("../controllers/splitteeController");
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

router.get("/bill/:id/splittee/add", SplitteeController.addSplittee);
router.get("/bill/:id/splittee/:sid", SplitteeController.getSplittee);
router.get("/bill/:id/splittee/:sid/edit", SplitteeController.editSplittee);
router.get("/bill/:id/splittee/:sid/delete", SplitteeController.deleteSplittee);

router.post("/bill/:id/edit", BillController.editBill);
router.get("/bill/:id/delete", BillController.deleteBill);

module.exports = router;
