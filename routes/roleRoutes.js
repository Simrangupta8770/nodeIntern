const express = require("express");

const { createRole,allRoles} = require('../controllers/roleControllers');
const router = express.Router();

router.post("/role",createRole);
router.route("/role").get(allRoles);
module.exports = router;