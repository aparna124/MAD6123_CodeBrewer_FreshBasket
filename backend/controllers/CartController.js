const Cart = require('../models/Cart')

const add = (req, res, next) => {

    // let cart = new Cart({

        
    // })

    // user.save()
    //     .then(data => {

    //         res.json(data);
    //     })
    //     .catch(err => {
    //         res.json({ Message: err });
    //     })
}

const getCartByUserId = (req, res, next) =>{
    const userId = req.query.userId
    const filter = {
        userId: userId
    }
    Cart.find(filter)
            .then(carts => {
                if(carts.length >0)
                    res.json(carts[0]);
                else{
                    res.json({})
                }
            })
            .catch(err => res.status(400).json('Error:' + err));
}



/**
           * post request to create/update cart
           * cartId: doc._id,
           * items,
           * userId
           * --
           * if(cartId==null){
           *    create a new cart with items and userId
           * }else{
           *    update (cartId)-> set items and userID
           * cart = get by Id (cartID)
           * cart.items = items;
           * cart.save()
           * }
           */

module.exports = {
    add,
    getCartByUserId
}