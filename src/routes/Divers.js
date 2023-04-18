const express = require("express");
const {
  createDiver,
  getAll_Divers,
  findDiverByName,
  getDiverById,
  getAllFilters,
  filterProducts,
} = require("../controllers/Diver");
const router = express();

router.get("/", getAll_Divers);
router.get("/filters", getAllFilters);
router.get("/detail/:id", getDiverById);
router.get("/search/:name", findDiverByName);
router.put("/filter", filterProducts);
router.post("/create", createDiver);

module.exports = router;
