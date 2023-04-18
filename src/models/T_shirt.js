const {DataTypes} = require("sequelize");

const T_shirt = (sequelize) => {
  sequelize.define(
    "T_shirt",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      color: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        defaultValue: "T_shirt",
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {timestamps: false}
  );
};
module.exports = T_shirt;
