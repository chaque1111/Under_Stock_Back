const {Diver} = require("../db");

let deleteAssents = (function () {
  let de = "ÁÃÀÄÂÉËÈÊÍÏÌÎÓÖÒÔÚÜÙÛÑÇáãàäâéëèêíïìîóöòôúüùûñç",
    a = "AAAAAEEEEIIIIOOOOUUUUNCaaaaaeeeeiiiioooouuuunc",
    re = new RegExp("[" + de + "]", "ug");

  return (texto) => texto.replace(re, (match) => a.charAt(de.indexOf(match)));
})();
const createDiver = async (req, res) => {
  try {
    const {name, price, image, color, description, size, brand} = req.body;

    const [product, created] = await Diver.findOrCreate({
      where: {name: name},
      defaults: {
        name: name,
        price: price,
        image: image,
        color: color,
        description: description ? description : null,
        size: size,
        brand: brand,
      },
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

const findDiverByName = async (req, res) => {
  try {
    const name = req.params.name;
    const allProducts = await Diver.findAll({
      attributes: ["name", "price", "color", "image", "size", "id"],
    });
    const ProductsFilter = allProducts.filter((e) =>
      e.name.toUpperCase().includes(name.toUpperCase())
    );
    ProductsFilter.length
      ? res.status(200).send(ProductsFilter)
      : res.status(200).send("No se encontró el producto");
  } catch (error) {
    res.status(400).send(error);
  }
};
const getAll_Divers = async (req, res) => {
  try {
    const allProducts = await Diver.findAll({
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
    const allColors = await Diver.findAll({attributes: ["color"]});
    const allSizes = await Diver.findAll({attributes: ["size"]});
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
    const allProducts = await Diver.findAll({
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
const validate = async (req, res) => {
  try {
    const name = req.params.name;
    const productos = await Diver.findAll({attributes: ["name"]});
    const existe = productos.filter(
      (e) => e.name.toUpperCase() === name.toUpperCase()
    );
    !existe.length
      ? res.status(200).send("El nombre está disponible")
      : res.status(201).send("El nombre no está disponible intenta con otro");
  } catch (error) {
    res.status(400).send(error);
  }
};
const getDiverById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Diver.findByPk(id);

    res.status(200).send(product);
  } catch (error) {
    res.status(200).send("El producto no existe");
  }
};

module.exports = {
  createDiver,
  getAll_Divers,
  findDiverByName,
  getDiverById,
  getAllFilters,
  filterProducts,
  validate,
};
