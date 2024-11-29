const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const exampleRoutes = require("./exampleRoutes");
const authRoutes = require("./authRoutes");
const categoryRoutes = require("./categoryRoutes");
const orderRoutes = require("./orderRoutes");
const adminRoutes = require("./adminRoutes");
const searchRoutes = require("./searchRoutes");

module.exports = (app) => {
  app.use("/admins", adminRoutes);
  app.use("/users", userRoutes);
  app.use("/products", productRoutes);
  app.use("/examples", exampleRoutes);
  app.use("/categories", categoryRoutes);
  app.use("/orders", orderRoutes);
  app.use(authRoutes);
  app.use(searchRoutes);
};
