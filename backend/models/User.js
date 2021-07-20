const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({

    email: {
        type: String,
        required: true
    },

    password: 
    {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },

    lastname: 
    {
        type: String,
        required: true
    },

    type:
    {
        type: String
    }

}, {timestamps: true} )

const User = mongoose.model('User', UserSchema)
module.exports = User