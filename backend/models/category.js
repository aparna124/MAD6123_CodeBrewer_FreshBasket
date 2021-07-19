const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({

    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    count: {
        type: Number,
        default: 0
    },

});

module.exports = mongoose.model('Category', CategorySchema);