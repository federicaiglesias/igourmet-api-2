const { Model, DataTypes } = require("sequelize");

class Admin extends Model {
  static initModel(sequelize) {
    Admin.init(
      {
        firstname: {
          type: DataTypes.STRING,
        },
        lastname: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "admin", // Nombre del modelo en singular y en minúscula.
      }
    );
    return Admin;
  }
}

module.exports = Admin;
