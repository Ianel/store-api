const Order = require('../models/Orders');
const asyncWrapper = require('../middleware/async');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

exports.getAllOrders = asyncWrapper(async (req, res) => {
    const orders = await Order.find({ orderedBy: req.user.userId }).sort('createdAt');
    res.status(StatusCodes.OK).json({ orders });
});

exports.getOrder = asyncWrapper(async (req, res) => {
    const order = await Order.findOne({ orderedBy: req.user.userId, _id: req.params.id });

    if (!order) {
        throw new NotFoundError('Order does not exist');
    }

    res.status(StatusCodes.OK).json({ order });
});

exports.createOrder = asyncWrapper(async (req, res) => {
    req.order.orderedBy = req.user.userId;
    const order = await Order.create(req.body);
    res.status(StatusCodes.CREATED).json({ status: "success", order });
});

exports.updateOrder = asyncWrapper(async (req, res) => {
    const order =  await Order.findOneAndUpdate({ orderedBy: req.user.userId, _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
    });
    if (!order) {
        throw new NotFoundError('Order does not exist');
    }
    res.status(StatusCodes.OK).json({ status: "success", order });
});

exports.deleteOrder = asyncWrapper(async (req, res) => {
    const order = await Order.findOneAndDelete({ orderedBy: req.user.userId, _id: req.params.id });
    if (!order) {
        throw new NotFoundError('Order does not exist');
    }
    res.status(StatusCodes.OK).json({ status: "success", order });
});