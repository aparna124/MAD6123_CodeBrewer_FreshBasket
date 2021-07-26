const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");

router.post("/add", orderController.add);
router.get("/", orderController.allOrders)
router.get("/:uid", orderController.userOrders)
router.post("/update", orderController.updateOrderStatus)
router.get("/get-by-user-id", orderController.getOrderByUserId);


module.exports = router;