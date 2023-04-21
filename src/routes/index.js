const express = require("express");
const router = express();
const products = require("./Products");
const remeras = require("./T-shirts");
const zapatillas = require("./Sneakers");
const pantalones = require("./Pants");
const buzos = require("./Divers");
const usuarios = require("./Users");
router.use("/productos", products);
router.use("/remeras", remeras);
router.use("/zapatillas", zapatillas);
router.use("/pantalones", pantalones);
router.use("/buzos", buzos);
router.use("/usuarios", usuarios);

module.exports = router;
