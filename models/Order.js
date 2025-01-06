const { Model, DataTypes } = require("sequelize");
const { nanoid } = require("nanoid");

class Orders extends Model {
  static initModel(sequelize) {
    Orders.init(
      {
        orderNumber: {
          type: DataTypes.STRING,
        },
        items: {
          type: DataTypes.JSON,
        },
        shippingInfo: {
          type: DataTypes.JSON,
        },
        contactInfo: {
          type: DataTypes.JSON,
        },
        paymentInfo: {
          type: DataTypes.JSON,
        },
        status: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "order",
        hooks: {
          beforeCreate: (order) => {
            order.orderNumber = nanoid(10);
          },
        },
      }
    );
    return Orders;
  }
}

module.exports = Orders;
