const express = require('express');
const router = express.Router();
const { findUser, registerUser, updateUser } = require('../controllers/user.controller');

router
  .route("/login")
  .post(findUser);

router
  .route("/signup")
  .post(registerUser); 

router
  .route("/account")
  .post(updateUser)

module.exports = router;