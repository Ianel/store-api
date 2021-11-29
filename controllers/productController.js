const Products = require('../models/Products');
const asyncWrapper = require('../middleware/async');
const { StatusCodes } = require('http-status-codes');
const { createCustomError } = require('../errors/custom-error');
const { BadRequestError, NotFoundError } = require('../errors');

exports.getAllProducts = asyncWrapper(async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    const queryObject = {};

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    } 

    if (company) {
        queryObject.company = company;
    }

    if (name) {
        queryObject.name = {$regex: name, $options: 'i'};
    }

    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        };

        const regEx = /\b(<|>|>=|=|<=)\b/g;

        let filters = numericFilters.replace(
            regEx, 
            (match) => `-${operatorMap[match]}-`
        );

        const options = ['price', 'rating'];

        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) };
            }
        });
    }

    console.log({ queryObject });

    let result = Products.find(queryObject);

    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        result = result.sort('createdAt');
    }

    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const products = await result;

    res.status(StatusCodes.OK).json({ status: "success", nbOfItems: products.length, products }); 
});

exports.getAllProductsStatic = asyncWrapper(async (req, res) => {
    const products = await Products
                            .find({ price: { $gt: 30 } })
                            .sort('price')
    res.status(StatusCodes.OK).json({ status: "success", nbOfItems: products.length, products }); 
});

exports.getProduct = asyncWrapper(async (req, res, next) => {
    const product = await Products.findOne({ _id: req.params.id });
    if (!product) {
        return next(createCustomError(`No product find with id: ${req.params.id}`, 404));
    }
    res.status(StatusCodes.OK).json({ product });
});

exports.addProduct = asyncWrapper(async (req, res) => {
    req.body.createdBy = req.user.userId;
    const product = await Products.create(req.body);
    res.status(StatusCodes.CREATED).json({ product });
});

exports.updateProduct = asyncWrapper(async (req, res) => {
    const product = await Products.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    } );
    if (!product) {
        return next(createCustomError(`No product find with id: ${req.params.id}`, 404));
    }
    res.status(StatusCodes.OK).json({ product }); 
});

exports.deleteProduct = asyncWrapper(async (req, res) => {
    const product = await Products.findOneAndDelete({ _id: req.params.id });
    if (!product) {
        return next(createCustomError(`No product find with id: ${req.params.id}`, 404));
    }
    res.status(StatusCodes.OK).json({ product: null, status: "success" });
});