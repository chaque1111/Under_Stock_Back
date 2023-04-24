const express = require("express");
const router = express();
const {
  createT_shirt,
  getAll_T_shirts,
  findShirtByName,
  getShirtById,
  getAllFilters,
  filterProducts,
  validate,
} = require("../controllers/T_shirts");

router.get("/", getAll_T_shirts);
router.get("/filters", getAllFilters);
router.get("/detail/:id", getShirtById);
router.get("/validate/:name", validate);
router.get("/search/:name", findShirtByName);
router.put("/filter", filterProducts);
router.post("/create", createT_shirt);

module.exports = router;
