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

  const getOrderByUserId = (req, res, next) => {
    const userId = req.query.userId;
    console.log("User id is" +userId);
    const filter = {
      userId: userId,
    };
    Order.find(filter)
      .then((orders) => {
        if (orders.length > 0) res.json(orders[0]);
        else {
          res.json({});
        }
      })
      .catch((err) => res.status(400).json("Error:" + err));
  };

module.exports = {
    add, allOrders, userOrders, updateOrderStatus, getOrderByUserId
  };