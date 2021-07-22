const express = require("express");
const router = express.Router();
const CartController = require("../controllers/CartController");
const Cart = require("../models/Cart");

router.get("/get-by-user-id", CartController.getCartByUserId);
router.post("/create-or-update", CartController.createOrUpdateCart);
router.post("/clear", CartController.clearCart);
module.exports = router;
