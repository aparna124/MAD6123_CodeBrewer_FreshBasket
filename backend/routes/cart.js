const express = require('express')
const router = express.Router()
const CartController = require('../controllers/CartController');
const Cart = require('../models/Cart');

router.route('/').post((req,res) => {
    const userid =  req.query.userid;
    const items = req.body.items;
    const userId = req.body.userId;

    console.log(userid);
    console.log(items);

    // Cart.updateOne({userId: userid} , {items: items, userId: userId},
    //     function(err, numberAffected, rawResponse) {
    //             //handle it
    //          })
    //         .then(() => res.json('Item added to cart as updation'))
    //         .catch(err => res.status(400).json('Error:' + err)); 
    
    
    const newProduct = new Cart({items: items, userId: userId});

    newProduct.save()
        .then(() => {
            res.json('Product Added.')
        })
        .catch(err => res.status(400).json('Error:' + err));
    
});


// router.route('/add').post((req,res) => {
//     const name = req.body.productName;
//     const category = req.body.categoryId;
//     const image = '';
//     const weight = req.body.productWeight;
//     const price = req.body.productPrice;
//     const details = req.body.productDescription;
//     const ingredients = req.body.productIngredients;
//     const newProduct = new Product({name, category, image, weight, price, details, ingredients});

//     newProduct.save()
//         .then(() => {
//             res.json('Product Added.')
//         })
//         .catch(err => res.status(400).json('Error:' + err));
// });



//router.post('/add', CartController.add)
router.get('/get-by-user-id', CartController.getCartByUserId)

module.exports = router