const express = require("express");
const {
  getAllProducts,
  searchProductsByName,
  getAllFilters,
  filterProducts,
  getProductById,
} = require("../controllers/Products");
const router = express();

router.get("/", getAllProducts);
router.get("/filters", getAllFilters);
router.get("/detail/:id", getProductById);
router.get("/search/:name", searchProductsByName);

router.put("/filter", filterProducts);

module.exports = router;
