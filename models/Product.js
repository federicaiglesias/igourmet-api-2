const { Model, DataTypes } = require("sequelize");

class Products extends Model {
  static initModel(sequelize) {
    Products.init(
      {
        name: {
          type: DataTypes.STRING,
        },
        price: {
          type: DataTypes.DECIMAL,
        },
        stock: {
          type: DataTypes.INTEGER,
        },
        description: {
          type: DataTypes.TEXT,
        },
        subdescription: {
          type: DataTypes.TEXT,
        },
        subcategory: {
          type: DataTypes.STRING,
        },
        image: {
          type: DataTypes.STRING,
        },
        featured: {
          type: DataTypes.BOOLEAN,
        },
        slug: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "products", // Nombre del modelo en singular y en minúscula.
      }
    );

    return Products;
  }
}

module.exports = Products;
