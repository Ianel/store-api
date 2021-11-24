const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Must have name"],
        trim: true,
        maxlength: [20, "Less than 20 characters"]
    }, 
    price: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Product', ProductSchema);