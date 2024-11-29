const { Category } = require("../models");

module.exports = async () => {
  const category = [];

  category.push({
    name: "Quesos",
  });
  category.push({
    name: "Fiambres",
  });
  category.push({
    name: "Tablas",
  });

  await Category.bulkCreate(category);
  console.log("[Database] Se corrió el seeder de Category.");
};
