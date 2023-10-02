const express = require("express");

const { allUsers, registerUser, authUser ,getMe} = require('../controllers/userControllers');
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/signup",registerUser);
router.post('/signin',authUser)
router.route("/").get(protect, allUsers);
router.route("/me").get(protect, getMe);
module.exports = router;