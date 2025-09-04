
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { register, login } = require('../controllers/authController');


router.post('/login', login);

module.exports = router;