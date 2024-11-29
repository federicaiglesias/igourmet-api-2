const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { expressjwt: checkJwt } = require("express-jwt");


router.get("/", productController.index);
router.get("/:slug", productController.show);
router.use(checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }));
router.post("/", productController.store);
router.patch("/:slug", productController.update);
router.delete("/:slug", productController.destroy);

module.exports = router;
