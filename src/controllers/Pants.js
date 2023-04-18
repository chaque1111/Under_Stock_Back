const {Pant} = require("../db");

let deleteAssents = (function () {
  let de = "ÁÃÀÄÂÉËÈÊÍÏÌÎÓÖÒÔÚÜÙÛÑÇáãàäâéëèêíïìîóöòôúüùûñç",
    a = "AAAAAEEEEIIIIOOOOUUUUNCaaaaaeeeeiiiioooouuuunc",
    re = new RegExp("[" + de + "]", "ug");

  return (texto) => texto.replace(re, (match) => a.charAt(de.indexOf(match)));
})();

const createPant = async (req, res) => {
  try {
    const {name, price, image, color, descripcion, size, brand} = req.body;

    const [product, created] = await Pant.findOrCreate({
      where: {name: name},
      defaults: {name, price, image, color, descripcion, size, brand},
    });
    if (created) {
      res.status(200).send("El producto se ha creado con éxito");
    } else {
      res.status(200).send("Ya existe un producto con ese nombre");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const findPantByName = async (req, res) => {
  try {
    const name = req.params.name;
    const allProducts = await Pant.findAll({
      attributes: ["name", "price", "color", "image", "size", "id"],
    });
    const ProductsFilter = allProducts.filter((e) =>
      deleteAssents(e.name)
        .toUpperCase()
        .includes(deleteAssents(name).toUpperCase())
    );
    ProductsFilter.length
      ? res.status(200).send(ProductsFilter)
      : res.status(200).send("No se encontró el producto");
  } catch (error) {
    res.status(400).send(error);
  }
};
const getAll_Pants = async (req, res) => {
  try {
    const allProducts = await Pant.findAll({
      attributes: ["name", "price", "color", "image", "size", "id"],
    });
    allProducts.length
      ? res.status(200).send(allProducts)
      : res.status(200).send("Aún no hay productos");
  } catch (error) {
    res.status(400).send(error);
  }
};
const getAllFilters = async (req, res) => {
  try {
    const allColors = await Pant.findAll({attributes: ["color"]});
    const allSizes = await Pant.findAll({attributes: ["size"]});
    const setColors = [];
    const setSizes = [];
    allColors.map((e) => {
      e.color.map((e) => {
        if (!setColors.includes(e)) {
          setColors.push(e);
        }
      });
    });
    allSizes.map((e) => {
      e.size.map((e) => {
        if (!setSizes.includes(e)) {
          setSizes.push(e);
        }
      });
    });
    res.status(200).send({colors: setColors, sizes: setSizes});
  } catch (error) {
    res.send(error);
  }
};

const filterProducts = async (req, res) => {
  try {
    const {color, size} = req.body;
    const allProducts = await Pant.findAll({
      attributes: ["name", "price", "color", "image", "size", "id"],
    });
    if (color && !size) {
      const productsFilters = allProducts.filter((e) =>
        e.color.includes(color)
      );
      res.status(200).send(productsFilters);
    }
    if (!color && size) {
      const productsFilters = allProducts.filter((e) => e.size.includes(size));
      res.status(200).send(productsFilters);
    }
    if (color && size) {
      const productsFilters = allProducts.filter(
        (e) => e.size.includes(size) && e.color.includes(color)
      );
      productsFilters.length
        ? res.status(200).send(productsFilters)
        : res
            .status(200)
            .send("No se encontró un producto con esas características");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
const getPantById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Pant.findByPk(id);

    res.status(200).send(product);
  } catch (error) {
    res.status(200).send("El producto no existe");
  }
};

module.exports = {
  createPant,
  getAll_Pants,
  findPantByName,
  getPantById,
  filterProducts,
  getAllFilters,
};
