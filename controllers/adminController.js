const { Admin } = require("../models");
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
  let admin = await Admin.findAll({ attributes: { exclude: ["password"] } });
  return res.json(admin);
}

// Display the specified resource.
async function show(req, res) {
  try {
    const admin = await Admin.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });

    if (!admin) return res.status(404).send("Administrador no encontrado");
    return res.status(200).json(admin);
  } catch (err) {
    return res.status(500).send("Error al obtener el administrador");
  }
}

// Store a newly created resource in storage.
async function store(req, res) {
  try {
    const { firstname, lastname, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    await Admin.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    return res.status(200).send("Administrador creado");
  } catch (err) {
    return res.status(500).send("Error al crear el administrador");
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  try {
    const adminId = req.params.id;
    const { firstname, lastname, email, password } = req.body;

    const admin = await Admin.findByPk(adminId);

    if (!admin) return res.status(404).send("Administrador no encontrado");

    let hashedPassword = admin.password;
    if (password) hashedPassword = await hashPassword(password);

    await admin.update({
      firstname: firstname || admin.firstname,
      lastname: lastname || admin.lastname,
      email: email || admin.email,
      password: hashedPassword,
    });

    return res.status(200).send("Administrador actualizado correctamente");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error al actualizar el administrador");
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  try {
    const id = req.params.id;

    const admin = await Admin.findByPk(id);

    if (!admin) return res.status(404).send("Administrador no encontrado");

    await admin.destroy();

    return res.status(200).send("Administrador eliminado correctamente");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error al eliminar el administrador");
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
