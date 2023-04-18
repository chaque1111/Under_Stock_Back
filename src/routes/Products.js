const express = require("express");
const {
  getAllProducts,
  searchProductsByName,
  getAllFilters,
  filterProducts,
} = require("../controllers/Products");
const router = express();

router.get("/", getAllProducts);
router.get("/filters", getAllFilters);
router.get("/search/:name", searchProductsByName);
router.put("/filter", filterProducts);

module.exports = router;
