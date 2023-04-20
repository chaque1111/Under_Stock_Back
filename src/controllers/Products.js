const {T_shirt, Diver, Pant, Sneaker} = require("../db");

let deleteAssents = (function () {
  let de = "ÁÃÀÄÂÉËÈÊÍÏÌÎÓÖÒÔÚÜÙÛÑÇáãàäâéëèêíïìîóöòôúüùûñç",
    a = "AAAAAEEEEIIIIOOOOUUUUNCaaaaaeeeeiiiioooouuuunc",
    re = new RegExp("[" + de + "]", "ug");

  return (texto) => texto.replace(re, (match) => a.charAt(de.indexOf(match)));
})();

const getAllProducts = async (req, res) => {
  try {
    const t_shirts = await T_shirt.findAll({
      attributes: ["name", "price", "color", "image", "size", "id"],
    });
    const divers = await Diver.findAll({
      attributes: ["name", "price", "color", "image", "size", "id"],
    });
    const pants = await Pant.findAll({
      attributes: ["name", "price", "color", "image", "size", "id"],
    });
    const sneakers = await Sneaker.findAll({
      attributes: ["name", "price", "color", "image", "size", "id"],
    });

    const allProducts = [...t_shirts, ...divers, ...pants, ...sneakers];
    allProducts.length
      ? res.status(200).send(allProducts)
      : res.status(200).send("Aún no hay productos");
  } catch (error) {
    console.log(error);
  }
};

const getProductById = async (req, res) => {
  try {
    const {id} = req.params;
    const t_shirts = await T_shirt.findAll({
      attributes: ["name", "price", "color", "image", "size", "id"],
    });
    const divers = await Diver.findAll({
      attributes: ["name", "price", "color", "image", "size", "id"],
    });
    const pants = await Pant.findAll({
      attributes: ["name", "price", "color", "image", "size", "id"],
    });
    const sneakers = await Sneaker.findAll({
      attributes: ["name", "price", "color", "image", "size", "id"],
    });
    const allProducts = [...t_shirts, ...divers, ...pants, ...sneakers];
    const productById = allProducts.filter((e) => e.id === id);
    res.status(200).send(productById[0]);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllFilters = async (req, res) => {
  try {
    const t_shirts = await T_shirt.findAll({attributes: ["color"]});
    const divers = await Diver.findAll({attributes: ["color"]});
    const pants = await Pant.findAll({attributes: ["color"]});
    const sneakers = await Sneaker.findAll({attributes: ["color"]});

    const allProducts = [...t_shirts, ...divers, ...pants, ...sneakers];

    const setColors = [];

    allProducts.map((e) => {
      e.color.map((e) => {
        if (!setColors.includes(e)) {
          setColors.push(e);
        }
      });
    });

    res.status(200).send({colors: setColors});
  } catch (error) {
    res.send(error);
  }
};

const filterProducts = async (req, res) => {
  try {
    const {color} = req.body;
    const t_shirts = await T_shirt.findAll({
      attributes: ["name", "price", "color", "image", "size", "id"],
    });
    const divers = await Diver.findAll({
      attributes: ["name", "price", "color", "image", "size", "id"],
    });
    const pants = await Pant.findAll({
      attributes: ["name", "price", "color", "image", "size", "id"],
    });
    const sneakers = await Sneaker.findAll({
      attributes: ["name", "price", "color", "image", "size", "id"],
    });
    const allProducts = [...t_shirts, ...divers, ...pants, ...sneakers];

    const productsFilter = allProducts.filter((e) => e.color.includes(color));
    res.status(200).send(productsFilter);
  } catch (error) {
    res.status(400).send(error);
  }
};
const searchProductsByName = async (req, res) => {
  try {
    const {name} = req.params;
    console.log(name);
    const t_shirts = await T_shirt.findAll({
      attributes: ["name", "price", "color", "image", "size", "id"],
    });
    const divers = await Diver.findAll({
      attributes: ["name", "price", "color", "image", "size", "id"],
    });
    const pants = await Pant.findAll({
      attributes: ["name", "price", "color", "image", "size", "id"],
    });
    const sneakers = await Sneaker.findAll({
      attributes: ["name", "price", "color", "image", "size", "id"],
    });
    const allProducts = [...t_shirts, ...divers, ...pants, ...sneakers];
    const productsByName = allProducts.filter((e) =>
      deleteAssents(e.name)
        .toUpperCase()
        .includes(deleteAssents(name).toUpperCase())
    );
    productsByName.length
      ? res.status(200).send(productsByName)
      : res.status(200).send("No se encontró el producto");
  } catch (error) {
    res.status(400).send(error);
  }
};
module.exports = {
  getAllProducts,
  searchProductsByName,
  getAllFilters,
  filterProducts,
  getProductById,
};
