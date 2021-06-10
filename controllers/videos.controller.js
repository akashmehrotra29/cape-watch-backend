const { Video } = require('../models/video.model');

const getVideos = async (req, res) => {
  try {
    console.log("from getVideos");
    const videos = await Video.find({});
    res.json({ success: true, videos });
  } catch(error) {
    res.json({ success: false, message: "unable to get videos"})
  }
}

const getVideoById = async (req, res) => {
  try {
    console.log("from getVideoById")
    const { videoId } = req.params;
    console.log("videoId: ", videoId)
    const video = await Video.findOne({
      _id: videoId
    });
    res.json({ success: true, video });
  } catch(error) {
    res.json({ success: false, message: "unable to get video" })
  }
}

module.exports = { getVideos, getVideoById };