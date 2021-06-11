const express = require('express');
const router = express.Router();
const { getVideos, findVideoById, getVideoById } = require('../controllers/videos.controller');

router
  .route("/")
  .get(getVideos);

router.param("videoId", findVideoById);

router
  .route("/:videoId")
  .get(getVideoById);



module.exports = router;