const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static initModel(sequelize) {
    User.init(
      {
        firstname: {
          type: DataTypes.STRING,
        },
        lastname: {
          type: DataTypes.STRING,
        },
        phoneNumber: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
        address: {
          type: DataTypes.STRING,
        },
        country: {
          type: DataTypes.STRING,
        },
        region: {
          type: DataTypes.STRING,
        },
        zipCode: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "user",
      }
    );
    return User;
  }
}

module.exports = User;
