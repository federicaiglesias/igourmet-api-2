const { Product } = require("../models");
const formidable = require("formidable");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
// Display a listing of the resource.
async function index(req, res) {
  let products = [];
  if (req.query.categoryId > 0) {
    products = await Product.findAll({
      where: { categoryId: req.query.categoryId },
      include: "category",
      order: [["id", "ASC"]],
    });
  } else {
    products = await Product.findAll({
      include: "category",
      order: [["id", "ASC"]],
    });
  }
  return res.json(products);
}

// Display the specified resource.
async function show(req, res) {
  const { slug } = req.params;
  const product = await Product.findOne({ where: { slug } });
  return res.json(product);
}
// Store a newly created resource in storage.
async function store(req, res) {
  try {
    const form = formidable({
      multiples: false,
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      const incomingFiles = files["image[]"];

      await Product.create({
        name: fields.name,
        price: fields.price,
        stock: fields.stock,
        description: fields.description,
        subdescription: fields.subdescription,
        subcategory: fields.subcategory,
        image: incomingFiles.newFilename,
        featured: fields.featured,
        slug: fields.slug,
      });
      const { data, error } = await supabase.storage
        .from("img")
        .upload(
          incomingFiles.newFilename,
          fs.createReadStream(incomingFiles.filepath),
          {
            cacheControl: "3600",
            upsert: false,
            contentType: incomingFiles.mimeType,
            duplex: "half",
          }
        );
      return res.status(200).send("Producto creado");
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error al crear el producto");
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  try {
    const { slug: originalSlug } = req.params;
    const {
      name,
      price,
      stock,
      description,
      subdescription,
      subcategory,
      image,
      featured,
      slug,
    } = req.body;

    const product = await Product.findOne({ where: { slug: originalSlug } });

    if (!product) return res.status(404).send("Producto no encontrado");

    await product.update({
      name: name || product.name,
      price: price || product.price,
      stock: stock || product.stock,
      description: description || product.description,
      subdescription: subdescription || product.subdescription,
      subcategory: subcategory || product.subcategory,
      image: image || product.image,
      featured: featured || product.featured,
      slug: slug || product.slug,
    });

    return res.status(200).send("Producto actualizado correctamente");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error al actualizar el producto");
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ where: { slug } });

    if (!product) return res.status(404).send("Producto no encontrado");

    await product.destroy();

    return res.status(200).send("Producto eliminado correctamente");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error al eliminar el producto");
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
