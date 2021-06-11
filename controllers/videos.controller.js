const { Video } = require('../models/video.model');

const getVideos = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.json({ success: true, videos });
  } catch(error) {
    res.json({ success: false, message: "unable to get videos"})
  }
}

const findVideoById = async (req, res, next, videoId) => {
  try {
    const video = await Video.findOne({ _id: videoId });
    if(!video) {
      throw Error ("unable to find the video");
    }
    req.video = video;
    next();
  } catch(error) {
    res.json({ success: false, message: "unable to get video" })
  }
}

const getVideoById = async (req, res) => {
  const { video } = req;
  res.json({ success: true, video });
}

module.exports = { getVideos, findVideoById, getVideoById };