const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { expressjwt: checkJwt } = require("express-jwt");


router.get("/", categoryController.index);
router.get("/:id", categoryController.show);
router.use(checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }));
router.post("/", categoryController.store);
router.patch("/:id", categoryController.update);
router.delete("/:id", categoryController.destroy);

module.exports = router;
