/*
 * El seeder no es más que un archivo que contiene una función que se encarga
 * de insertar datos (generalmente de prueba) en una base de datos.
 *
 * El nombre "seeder" es una convención y significa "semillero".
 *
 * Además, en este caso, se está usando una librería llamada Faker
 * (https://fakerjs.dev/) para facilitar la creación de datos ficticios como
 * nombres, apellidos, títulos, direcciones y demás textos.
 *
 * Suele ser común que en los seeders exista un `for` donde se define la
 * cantidad de registros de prueba que se insertarán en la base de datos.
 *
 * En este ejemplo se están insertando 100 usuarios con nombres ficticios.
 */

const { User } = require("../models");

module.exports = async () => {
  const users = [];

  users.push({
    firstname: "Cliente",
    lastname: "Cliente",
    phoneNumber: "099999999",
    email: "cliente@igourmet.com",
    password: "$2y$10$Rcvdbpa4ATv5mZ9atTC7sOzZvAnmBCksx8t5dkaFID0Uiano1xd6O",
    orders: "",
    address: "Av. Italia 123",
    country: "Uruguay",
    region: "Maldonado",
    zipCode: "20000",
  });

  await User.bulkCreate(users);
  console.log("[Database] Se corrió el seeder de Users.");
};
