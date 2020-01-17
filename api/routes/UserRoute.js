const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController')

router.get('/profile/:user_id', UserController.profile)

module.exports = router