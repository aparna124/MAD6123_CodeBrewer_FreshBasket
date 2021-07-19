const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    weight: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    details: {
        type: String,
        required: false
    },
    ingredients: {
        type: String,
        required: false
    },

});

module.exports = mongoose.model('Product', ProductSchema);