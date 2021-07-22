const mongoose = require('mongoose')
const Schema = mongoose.Schema


var CartSchema = new Schema({

    items: 
    {
        type: Object
    },

    userId: 
    {
        type: String
    }
  
    
});

const Cart = mongoose.model('Cart', CartSchema)
module.exports = Cart