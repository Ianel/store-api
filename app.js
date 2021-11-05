// NODE MODULES
const express = require('express');
const morgan = require('morgan');

// CUSTOM MODULES
const movieRouter = require('./routes/movieRoutes');

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

// ROUTE HANDLERS
app.get('/', (req, res) => {
    res.status(200).json({
        "status": "success",
        "data": { 
            message: 'Hello World from artflix', 
            app: "artflix" 
        }
    });
});

// ROUTES
app.use('/artflix/v1/movies', movieRouter);

module.exports = app;