const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RestaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    dish: [{
        type: Schema.Types.ObjectId,
        ref: 'Dish'
    }],
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    order: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }]
})

module.exports = mongoose.model('Restaurant', RestaurantSchema)