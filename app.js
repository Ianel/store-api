require('express-async-errors');

// NODE MODULES
const express = require('express');
const morgan = require('morgan');

// ROUTERS
const userRoutes = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');
const authRouter = require('./routes/authRoutes');
const productRouter = require('./routes/productRoutes');

// AUTH HANDLER
const authenticationMiddleware = require('./middleware/auth');

// ERROR HANDLER
const errorHandlerMiddleware = require('./middleware/error-handler');

// VARIABLES
const app = express();

// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

// ROUTES
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/orders', authenticationMiddleware, orderRouter);
app.use('/api/v1/products', productRouter);

app.use(errorHandlerMiddleware);

module.exports = app;