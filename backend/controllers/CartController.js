const Cart = require("../models/Cart");

const createOrUpdateCart = (req, res, next) => {
  const userId = req.body.userId;
  const cartId = req.body.cartId || null;
  const items = req.body.items;

  console.log(userId);


  console.log(items);

  
  if (cartId === null) {
    const cart = new Cart({ userId: userId, items: items });
    cart.save().then(() => {
      res.sendStatus(204);
    });
  } else {
    Cart.findOneAndUpdate(
      { _id: cartId },
      {
        $set: {
          items: items,
        },
      }
    )
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
};

const clearCart = (req, res, next) => {
  const cartId = req.query.cartId;
  console.log(cartId);
  Cart.deleteOne({ _id: cartId })
    .then(() => {
      res.sendStatus(204);
      console.log("yes deleted");
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log("Not deleted");
    });
};



// const clearCart = (req, res, next) => {
//   const cartId = req.query.cartId;
//   console.log("cartId")
//   Cart.deleteOne({ _id: cartId })
//     .then(() => {
//       res.sendStatus(204);
//       console.log("yes deleted");
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//       console.log("Not deleted");
//     });
// };




const getCartByUserId = (req, res, next) => {
  const userId = req.query.userId;
  const filter = {
    userId: userId,
  };
  Cart.find(filter)
    .then((carts) => {
      if (carts.length > 0) res.json(carts[0]);
      else {
        res.json({});
      }
    })
    .catch((err) => res.status(400).json("Error:" + err));
};

module.exports = {
  getCartByUserId,
  createOrUpdateCart,
  clearCart
};
