const { User, Order } = require("../models");
const bcrypt = require("bcryptjs");

async function hashPassword(password) {
  try {
    const workFactor = 10;
    const hashedPassword = await bcrypt.hash(password, workFactor);
    return hashedPassword;
  } catch (err) {
    console.error(err);
  }
}

// Display a listing of the resource.
async function index(req, res) {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }, 
      include: {
        model: Order,
        as: "orders",
      },
    });
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error al obtener los usuarios");
  }
}

// Display the specified resource.
async function show(req, res) {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }, 
      include: "orders"
    });
    if (!user) return res.status(404).send("Usuario no encontrado");
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).send("Error al obtener el usuario");
  }
}


// Store a newly created resource in storage.
async function store(req, res) {
  try {
    const {
      firstname,
      lastname,
      phoneNumber,
      email,
      password,
      address,
      country,
      region,
      zipCode,
    } = req.body;
    const hashedPassword = await hashPassword(password);
    await User.create({
      firstname,
      lastname,
      phoneNumber,
      email,
      password: hashedPassword,
      address,
      country,
      region,
      zipCode,
    });
    return res.status(200).send("Usuario creado");
  } catch (err) {
    return res.status(500).send("Error al crear el usuario");
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  try {
    const userId = req.params.id;
    const {
      firstname,
      lastname,
      phoneNumber,
      email,
      address,
      country,
      region,
      zipCode,
    } = req.body;

    const user = await User.findByPk(userId);

    if (!user) return res.status(404).send("Usuario no encontrado");

    await user.update({
      firstname: firstname || user.firstname,
      lastname: lastname || user.lastname,
      phoneNumber: phoneNumber || user.phoneNumber,
      email: email || user.email,
      address: address || user.address,
      country: country || user.country,
      region: region || user.region,
      zipCode: zipCode || user.zipCode,
    });

    return res.status(200).send("Usuario actualizado correctamente");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error al actualizar el usuario");
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  try {
    const id = req.params.id;

    const user = await User.findByPk(id);

    if (!user) return res.status(404).send("Usuario no encontrado");

    await user.destroy();

    return res.status(200).send("Usuario eliminado correctamente");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error al eliminar el usuario");
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
