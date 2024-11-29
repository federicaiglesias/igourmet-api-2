const { User, Admin } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function loginUser(req, res) {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) return res.json({ Msg: "Verifique credenciales...1" });
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) return res.json({ Msg: "Verificar Credenciales...2" });

  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET);

  return res.json({
    token,
    email: user.email,
    userId: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    phoneNumber: user.phoneNumber,
    address: user.address,
    country: user.country,
    region: user.region,
    zipCode: user.zipCode,
  });
}

async function loginAdmin(req, res) {
  const admin = await Admin.findOne({ where: { email: req.body.email } });
  if (!admin) return res.json({ Msg: "Verifique credenciales...1" });
  const validPassword = await bcrypt.compare(req.body.password, admin.password);

  if (!validPassword) return res.json({ Msg: "Verificar Credenciales...2" });

  const token = jwt.sign({ sub: admin.id }, process.env.JWT_SECRET);

  return res.json({ token, email: admin.email, userId: admin.id });
}

module.exports = {
  loginUser,
  loginAdmin,
};
