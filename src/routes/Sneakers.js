const express = require("express");
const router = express();
const {
  createSneaker,
  getAll_Sneakers,
  findSneakerByName,
  getSneakerById,
  getAllFilters,
  filterProducts,
  validate,
} = require("../controllers/Sneakers");

router.get("/", getAll_Sneakers);
router.get("/filters", getAllFilters);
router.get("/detail/:id", getSneakerById);
router.get("/validate/:name", validate);
router.get("/search/:name", findSneakerByName);
router.put("/filter", filterProducts);
router.post("/create", createSneaker);

module.exports = router;
