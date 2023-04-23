const express = require("express");
const {findOrCreateUser, deleteUser} = require("../controllers/User");
const router = express();

router.post("/create", findOrCreateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
