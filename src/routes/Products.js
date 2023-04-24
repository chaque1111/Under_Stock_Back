const express = require("express");
const {
  getAllProducts,
  searchProductsByName,
  getAllFilters,
  filterProducts,
  getProductById,
  getAllColors,
} = require("../controllers/Products");
const router = express();

router.get("/", getAllProducts);
router.get("/colors", getAllColors);
router.get("/filters", getAllFilters);
router.get("/detail/:id", getProductById);
router.get("/search/:name", searchProductsByName);

router.put("/filter", filterProducts);

module.exports = router;
