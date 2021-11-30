const Order = require('../models/Orders');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');

exports.getAllOrders = async (req, res) => {
    const orders = await Order.find({ orderedBy: req.user.userId }).sort('createdAt');
    res.status(StatusCodes.OK).json({ status: "success", nbOfItems: orders.length, data: orders });
};

exports.getOrder = async (req, res) => {
    const order = await Order.findOne({ orderedBy: req.user.userId, _id: req.params.id });

    if (!order) {
        throw new NotFoundError('Order does not exist');
    }

    res.status(StatusCodes.OK).json({ status: "success", data: order });
};

exports.createOrder = async (req, res) => {
    req.body.orderedBy = req.user.userId;
    const order = await Order.create(req.body);
    res.status(StatusCodes.CREATED).json({ status: "success", data: order });
};

exports.updateOrder = async (req, res) => {
    const order =  await Order.findOneAndUpdate({ orderedBy: req.user.userId, _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
    }); 
    if (!order) {
        throw new NotFoundError('Order does not exist');
    }
    res.status(StatusCodes.OK).json({ status: "success", data: order });
};

exports.deleteOrder = async (req, res) => {
    const order = await Order.findOneAndDelete({ orderedBy: req.user.userId, _id: req.params.id });
    if (!order) {
        throw new NotFoundError('Order does not exist');
    }
    res.status(StatusCodes.OK).json({ status: "success", data: order });
};