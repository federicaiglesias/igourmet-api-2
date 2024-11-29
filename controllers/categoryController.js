const { Category } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
  const categories = await Category.findAll();
  res.json(categories);
}

// Display the specified resource.
async function show(req, res) {
  const category = await Category.findByPk(req.params.id);
  res.json(category);
}

// Store a newly created resource in storage.
async function store(req, res) {
  try {
    const name = req.body;
    await Category.create(name);
    return res.status(200).send("Categoría creada");
  } catch (err) {
    return res.status(500).send("Error al crear la categoría");
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  try {
    const id = req.params.id;
    const name = req.body;

    const category = await Category.findByPk(id);

    if (!category) return res.status(404).send("Categoría no encontrada");

    await category.update(name);
    return res.status(200).send("Categoría actualizada correctamente");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error al actualizar la categoría");
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  try {
    const id = req.params.id;

    const category = await Category.findByPk(id);

    if (!category) return res.status(404).send("Categoría no encontrada");

    await category.destroy();

    return res.status(200).send("Categoría eliminada correctamente");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error al eliminar la categoría");
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
