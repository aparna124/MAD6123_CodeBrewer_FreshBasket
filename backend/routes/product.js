const express = require('express');
const router = express.Router();
let Product = require('../models/product');
let Category = require('../models/category');

router.route('/').get((req,res) => {
    const categoryId = req.query.categoryId
    const searchText = req.query.searchText;
    if(categoryId == undefined || categoryId == null){
        Product.find()
            .then(product => res.json(product))
            .catch(err => res.status(400).json('Error:' + err));
    }
    else {
        Product.find({category: categoryId})
            .then(product => res.json(product))
            .catch(err => res.status(400).json('Error:' + err));
    }
});

router.route('/search').get((req,res) => {
    const searchText = req.query.searchText;
    console.log(searchText);
        Product.find({name: searchText})
            .then(product => res.json(product))
            .catch(err => res.status(400).json('Error:' + err));
    
});

router.route('/:id').get((req,res) => {
    const productId = req.params.id
    Product.findById(productId)
            .then(product => res.json(product))
            .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:id').put((req,res) => {
    const productId = req.params.id
    const name = req.body.productName;
    const category = req.body.categoryId;
    const image = req.body.image;
    const weight = req.body.productWeight;
    const price = req.body.productPrice;
    const details = req.body.productDescription;
    const ingredients = req.body.productIngredients;

    var updateData = {name, category, weight, price, details, ingredients}
    console.log(image)
    if(image != null && image != undefined){
        updateData = {...updateData, image}
    }
    Product.findByIdAndUpdate(productId, updateData)
        .then(() => res.json('Product Updated.'))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:id').delete((req,res) => {
    const productId = req.params.id
    Product.findByIdAndDelete(productId)
        .then(() => res.json('Product Deleted.'))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/add').post((req,res) => {
    const name = req.body.productName;
    const category = req.body.categoryId;
    const image = req.body.image;
    const weight = req.body.productWeight;
    const price = req.body.productPrice;
    const details = req.body.productDescription;
    const ingredients = req.body.productIngredients;
    const newProduct = new Product({name, category, image, weight, price, details, ingredients});

    newProduct.save()
        .then(() => {
            res.json('Product Added.')
        })
        .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router;


