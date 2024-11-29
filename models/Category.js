const { Model, DataTypes } = require("sequelize");

class Category extends Model {
  static initModel(sequelize) {
    Category.init(
      {
        name: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "category", // Nombre del modelo en singular y en minúscula.
      }
    );
    return Category;
  }
}

module.exports = Category;
