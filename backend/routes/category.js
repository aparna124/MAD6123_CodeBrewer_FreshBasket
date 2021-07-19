const express = require('express');
const router = express.Router();
let Category = require('../models/category');

router.route('/').get((req,res) => {
    Category.find()
        .then(category => res.json(category))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/add').post((req,res) => {
    const name = req.body.categoryName;
    const image = '';
    const count = 0
    
    const newCategory = new Category({name, image, count});

    newCategory.save()
        .then(() => res.json('Category Added.'))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:id').get((req,res) => {
    const categoryId = req.params.id
    Category.findById(categoryId)
        .then(category => res.json(category))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:id').put((req,res) => {
    const categoryId = req.params.id
    const name = req.body.categoryName;
    const image = ''


    Category.findByIdAndUpdate(categoryId, {name, image})
        .then(() => res.json('Category Updated.'))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:id').delete((req,res) => {
    const categoryId = req.params.id
    Category.findByIdAndDelete(categoryId)
        .then(() => res.json('Category Deleted.'))
        .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router;