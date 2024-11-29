const { Op } = require('sequelize');
const Product = require('../models/Product');

const searchProducts = async (req, res) => {
  try {
      const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'El parámetro de búsqueda es requerido' });
    }

    const products = await Product.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
        ],
      },
      attributes: ['name', 'price', 'image', "slug"],
      limit: 10,
    });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al buscar productos' });
  }
};

module.exports = { searchProducts };
