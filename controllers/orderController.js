const { Order } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
  const orders = await Order.findAll();
  return res.json(orders);
}
// Display the specified resource.
async function show(req, res) {
  const order = await Order.findByPk(req.params.id);
  return res.json(order);
}

// Store a newly created resource in storage.
async function store(req, res) {
  await Order.create({
    items: req.body.cart,
    shippingInfo: req.body.shippingInfo,
    contactInfo: req.body.contactInfo,
    paymentInfo: req.body.paymentInfo,
    status: "Pendiente",
    userId: req.auth.sub,
  });
  res.json({ msg: "Order created." });
}

// Update the specified resource in storage.
async function update(req, res) {
  try {
    const id = req.params.id;
    const status = req.body;

    const order = await Order.findByPk(id);

    if (!order) return res.status(404).send("Orden no encontrada");

    await order.update(status);
    return res.status(200).send("Orden actualizada correctamente");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error al actualizar la orden.");
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  try {
    const id = req.params.id;

    const order = await Order.findByPk(id);

    if (!order) return res.status(404).send("Orden no encontrada");

    await order.destroy();

    return res.status(200).send("Orden eliminada correctamente");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error al eliminar la orden");
  }
}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
