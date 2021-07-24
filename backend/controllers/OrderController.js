const Order = require("../models/Order");

const add = (req, res, next) => {
    const order = new Order({
        orderId: req.body.orderId,
        products: req.body.products,
        status: req.body.status,
        totalPrice: req.body.totalPrice,
        userId: req.body.userId
    });

    order.save()
    .then(data => {

        res.json(data);
    })
    .catch(err => {
        res.json({Message: err});
    })
  };




module.exports = {
    add
  };