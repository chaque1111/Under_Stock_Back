const {DataTypes} = require("sequelize");

const Pant = (sequelize) => {
  sequelize.define(
    "Pant",
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
        defaultValue: "Pant",
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {timestamps: false}
  );
};

module.exports = Pant;
