const User = require('../models/Users');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

exports.getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.status(StatusCodes.OK).json({ status: "success", nbOfItems: users.length, users });
}; 

exports.getUser = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    res.status(StatusCodes.OK).json({ status: "success", user });
};

exports.updateUser = async (req, res) => {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
    });
    res.status(StatusCodes.OK).json({ status: "success", user });
}

exports.deleteUser = async (req, res) => {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    res.status(StatusCodes.OK).json({ status: "success", user });
}