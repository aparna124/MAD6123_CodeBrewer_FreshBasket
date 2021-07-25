const Order = require("../models/Order");
const User = require("../models/User")

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

  const updateOrderStatus = (req, res, next) => {
    const orderId= req.body.orderId
    const status = req.body.status
    Order.findByIdAndUpdate(orderId, {status})
    .then(data => {

        res.json(data);
    })
    .catch(err => {
        res.json({Message: err});
    })
  };
const allOrders = (req, res, next) => {
    Order
    .aggregate([
        {
          $lookup:
            {
              from: "users",
              localField: "userid",
              foreignField: "userId",
              as: "user"
            }
       }
     ])
    //  .find()
     .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({Message: err});
    })
  };

const userOrders = (req, res, next) => {
    const uid = req.params.uid
    Order.find({userId: uid})
    .then(data => {

        res.json(data);
    })
    .catch(err => {
        res.json({Message: err});
    })
  };


module.exports = {
    add, allOrders, userOrders, updateOrderStatus
  };