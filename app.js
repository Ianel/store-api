// NODE MODULES
const express = require('express');
const morgan = require('morgan');

// CUSTOM MODULES
const productRouter = require('./routes/productRoutes');

// VARIABLES
const app = express();

// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
    console.log("Hello from the middleware");
    next();
});
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

// ROUTES
app.use('/api/v1/products', productRouter);

module.exports = app;