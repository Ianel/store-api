const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
require('express-async-errors');

const app = require('./app');
const connectDB = require('./db/connect');

const port = process.env.PORT || 3000;
console.log({ port });

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`App running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start(); 
