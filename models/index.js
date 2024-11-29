const { Sequelize } = require("sequelize");

const sequelizeConfig = {
  host: process.env.DB_HOST,
  dialect: process.env.DB_CONNECTION,
  logging: false,
};
if (process.env.DB_CONNECTION === "postgres") {
  sequelizeConfig.dialectModule = require("pg");
}

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  sequelizeConfig
);

// Requerir todos los modelos:
const User = require("./User");
const Admin = require("./Admin");
const Category = require("./Category");
const Product = require("./Product");
const Order = require("./Order");

// Inicializar todos los modelos:
User.initModel(sequelize);
Admin.initModel(sequelize);
Category.initModel(sequelize);
Product.initModel(sequelize);
Order.initModel(sequelize);

User.hasMany(Order);
Order.belongsTo(User);
Category.hasMany(Product);
Product.belongsTo(Category);

module.exports = {
  sequelize,
  User,
  Admin,
  Category,
  Product,
  Order,
};
