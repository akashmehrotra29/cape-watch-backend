const express = require('express');
const router = express.Router();
const { findUser, registerUser } = require('../controllers/user.controller');

router
  .route("/login")
  .post(findUser);

router
  .route("/signup")
  .post(registerUser); 

module.exports = router;