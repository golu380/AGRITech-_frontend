const express = require('express');

const router = express.Router();
const Authentication = require('../controllers/Authentication')


router.post('/register',Authentication.register);

module.exports = router;