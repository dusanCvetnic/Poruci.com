const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DishSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 64
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String, 
        enum: ['appetizer', 'soup', 'salad', 'mainDish', 'dessert'],
        required: true
    },
     order: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }],
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    }
})

module.exports = mongoose.model('Dish', DishSchema)