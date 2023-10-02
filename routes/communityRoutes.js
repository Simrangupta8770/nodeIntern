const express = require("express");

const { createCommunity,getAllCommunity,communityMembers,communityOwned,communityJoined} = require('../controllers/communityControllers');
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/community").post(protect, createCommunity);
router.route("/community").get(getAllCommunity);
router.route("/community/:commSlug/members").get(communityMembers);
router.route("/community/me/owner").get(protect, communityOwned);
router.route("/community/me/member").get(protect, communityJoined);


module.exports = router;