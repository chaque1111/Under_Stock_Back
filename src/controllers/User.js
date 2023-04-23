const {User} = require("../db");

const findOrCreateUser = async (req, res) => {
  try {
    const userObj = req.body;
    const [user, created] = await User.findOrCreate({
      where: {id: userObj.email},
      defaults: {
        name: userObj.name,
        image: userObj.image,
        updated_at: userObj.updated_at,
        id: userObj.email,
      },
    });
    if (created) {
      res.status(200).send(user);
    } else {
      res.status(201).send(user);
    }
  } catch (error) {
    res.status;
  }
};

const deleteUser = async (req, res) => {
  try {
    const {id} = req.params;
    await User.destroy({where: {id: id}});
    res.status(200).send("Cuenta eliminada correctamente!");
  } catch (error) {
    res.status(300).send(error);
  }
};

module.exports = {
  findOrCreateUser,
  deleteUser,
};
