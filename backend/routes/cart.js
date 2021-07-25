const express = require("express");
const router = express.Router();
const CartController = require("../controllers/CartController");
const Cart = require("../models/Cart");

router.get("/get-by-user-id", CartController.getCartByUserId);
router.post("/create-or-update", CartController.createOrUpdateCart);
router.get("/clearCart", CartController.clearCart);

module.exports = router;
