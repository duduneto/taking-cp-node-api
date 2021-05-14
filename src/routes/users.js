const express = require('express');

const userController = require('../controllers/user/user.controller');

const router = express.Router();

const { valid_login } = require('../validations/user')

//= ===============================
// User routes
//= ===============================

router.post(
  '/',
  userController.create,
);

router.post(
  '/login',
  valid_login,
  userController.login,
);

module.exports = router;
