const express = require('express');
const router = express.Router();
const { getVideos, getVideoById } = require('../controllers/videos.controller');

router
  .route("/")
  .get(getVideos);

router
  .route("/:videoId")
  .get(getVideoById);

module.exports = router;