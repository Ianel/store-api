const express  = require('express');
const { getAllProducts, addProduct, getProduct, updateProduct, deleteProduct } = require('../controllers/productController');

const router = express.Router();

router.param('id', (req, res, next, val) => {
    console.log({ val });
    next();
});

router
    .route('/')
    .get(getAllProducts)
    .post(addProduct);

router
    .route('/:id')
    .get(getProduct)
    .patch(updateProduct)
    .delete(deleteProduct);

module.exports = router;