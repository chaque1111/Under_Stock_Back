const express = require("express");
const {
  createPant,
  getAll_Pants,
  findPantByName,
  getPantById,
  getAllFilters,
  filterProducts,
  validate,
} = require("../controllers/Pants");
const router = express();

router.get("/", getAll_Pants);
router.get("/filters", getAllFilters);
router.get("/detail/:id", getPantById);
router.get("/validate/:name", validate);
router.get("/search/:name", findPantByName);
router.put("/filter", filterProducts);
router.post("/create", createPant);

module.exports = router;
