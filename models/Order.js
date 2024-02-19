const mongoose = require('mongoose');
const Users = require('./User');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    items: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    }],
    total: {
        type: Number, 
        default: 0, 
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;