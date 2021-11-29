const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers/authControllers');

const authMiddleware = require('../middleware/auth');

router.route('/register').post(register);
router.route('/login').post(login);

module.exports = router;