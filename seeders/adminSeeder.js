const { Admin } = require("../models");

module.exports = async () => {
  const admin = [];

  admin.push({
    firstname: "Admin",
    lastname: "Admin",
    email: "admin@gmail.com",
    password: "$2y$10$Rcvdbpa4ATv5mZ9atTC7sOzZvAnmBCksx8t5dkaFID0Uiano1xd6O",
  });

  await Admin.bulkCreate(admin);
  console.log("[Database] Se corrió el seeder de Admin.");
};
