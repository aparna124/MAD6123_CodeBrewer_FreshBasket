const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");

router.post("/add", orderController.add);

module.exports = router;