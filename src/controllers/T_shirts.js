const {T_shirt} = require("../db");

let deleteAssents = (function () {
  let de = "ÁÃÀÄÂÉËÈÊÍÏÌÎÓÖÒÔÚÜÙÛÑÇáãàäâéëèêíïìîóöòôúüùûñç",
    a = "AAAAAEEEEIIIIOOOOUUUUNCaaaaaeeeeiiiioooouuuunc",
    re = new RegExp("[" + de + "]", "ug");

  return (texto) => texto.replace(re, (match) => a.charAt(de.indexOf(match)));
})();

const createT_shirt = async (req, res) => {
  try {
    const {name, price, image, color, description, size, brand} = req.body;

    const [product, created] = await T_shirt.findOrCreate({
      where: {name: name},
      defaults: {name, price, image, color, description, size, brand},
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

const findShirtByName = async (req, res) => {
  try {
    const name = req.params.name;
    const allProducts = await T_shirt.findAll({
      attributes: ["name", "price", "color", "image", "size", "id"],
    });
    const ProductsFilter = allProducts.filter((e) =>
      deleteAssents(e.name.toUpperCase()).includes(
        deleteAssents(name.toUpperCase())
      )
    );
    ProductsFilter.length
      ? res.status(200).send(ProductsFilter)
      : res.status(200).send("No se encontró el producto");
  } catch (error) {
    res.status(400).send(error);
  }
};
const getAll_T_shirts = async (req, res) => {
  try {
    const allProducts = await T_shirt.findAll({
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
    const allColors = await T_shirt.findAll({attributes: ["color"]});
    const allSizes = await T_shirt.findAll({attributes: ["size"]});
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
    const allProducts = await T_shirt.findAll({
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
const getShirtById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await T_shirt.findByPk(id);

    res.status(200).send(product);
  } catch (error) {
    res.status(200).send("El producto no existe");
  }
};
/*
{
    "name": "Buzo Essentials Color Blanco Blanco",
    "image": ["https://d3ugyf2ht6aenh.cloudfront.net/stores/252/220/products/36ebb3b9-2462-48c2-96d0-351d7fe5cd8e-407178ff613782ca3216565181248633-640-0.webp"],
    "price": "10.000",
    "color": ["#fff","#000"],
    "size": ["M","XL","XXL"],
    "brand": "Essentials",
    "description": "uwu"
}
*/
module.exports = {
  createT_shirt,
  getAll_T_shirts,
  findShirtByName,
  getShirtById,
  getAllFilters,
  filterProducts,
};
