const express = require('express');

const userController = require('../controllers/user/user.controller');

const router = express.Router();

//= ===============================
// User routes
//= ===============================

router.post(
  '/',
  userController.create,
);
router.post(
  '/login',
  userController.login,
);

module.exports = router;
