const { videos } = require('../data');
const { Video } = require('../models/video.model');

const seedVideos = () => {
  videos.forEach( async video => {
    const newVideo = new Video({
      id: video.id,
      thumbnailURL: video.thumbnailURL,
      title: video.title,
      description: video.description,
      categories: video.categories,
      channelName: video.channelName,
      channelImageURL: video.channelImageURL,
      publishedDate: video.publishedDate,
      viewCount: video.statistics.viewCount,
      likeCount: video.statistics.likeCount,
      dislikeCount: video.statistics.dislikeCount,
      commentCount: video.statistics.commentCount
    });
    const savedVideo = await newVideo.save();
    console.log(savedVideo.title);
  })
}

module.exports = { seedVideos };