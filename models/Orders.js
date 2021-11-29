const mongoose = require('mongoose');

const Order = new mongoose.Schema({
    orderedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Must be ordered by someone'],
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    products: {
        type: Array,
        required: [true, 'Must have products']    
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', Order);