// NODE MODULES
const express = require('express');
const morgan = require('morgan');

// ROUTERS
const authenticateUser = require('./middleware/auth');
const userRoutes = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');
const authRouter = require('./routes/authRoutes');
const productRouter = require('./routes/productRoutes');

// ERROR HANDLER
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

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
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/orders', authenticateUser, orderRouter);
app.use('/api/v1/products', productRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


module.exports = app;