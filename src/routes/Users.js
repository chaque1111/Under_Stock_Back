const express = require("express");
const {findOrCreateUser} = require("../controllers/User");
const router = express();

router.post("/create", findOrCreateUser);

module.exports = router;
