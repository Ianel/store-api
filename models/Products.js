const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Must have name"],
        trim: true,
        maxlength: [100, "Less than 100 characters"]
    }, 
    price: {
        type: Number,
        required: [true, "Must have a price"],
        default: 0
    },
    feature: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported'
        }
        //enum: ['ikea', 'liddy', 'caressa', 'marcos']
    }, 
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    }
}, {timestamps: true});

module.exports = mongoose.model('Product', ProductSchema);