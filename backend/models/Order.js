const mongoose = require('mongoose')
const Schema = mongoose.Schema


var OrderSchema = new Schema({

    orderId: 
    {
        type: String
    },

    products: 
    {
        type: Array
    },

    status:
    {
        type: String
    },

    totalPrice:
    {
        type: String
    },

    userId:
    {
        type: String
    }
  
    
});

const Order = mongoose.model('Order', OrderSchema)
module.exports = Order