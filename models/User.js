const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 64
    },
    surname: {
        type: String,
        required: true,
        min: 3,
        max: 64
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
    password: {
        type: String,
        required: true,
        min: 6,
        max: 64
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'manager', 'delivery'],
        default: 'user'
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

module.exports = mongoose.model('User', UserSchema)