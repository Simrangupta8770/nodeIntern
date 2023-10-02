const express = require("express");

const {addMember,deleteMember } = require('../controllers/memberControllers');
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/member").post(protect, addMember);
router.route("/member/:mem").post(protect, deleteMember);

module.exports = router;