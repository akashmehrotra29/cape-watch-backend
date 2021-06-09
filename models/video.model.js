const mongoose = require('mongoose');
require('mongoose-type-url');

const VideoSchema = new mongoose.Schema({
  id: {
    type: String,
    required: "Can't add without video id"
  },
  thumbnailURL: {
    type: String,
    required: "Can't add without thumbnailURL"
  },
  title: {
    type: String,
    required: "Can't add without title"
  },
  description: {
    type: String,
    required: "Can't add without description"
  },
  categories: [{
    type: String
  }],
  channelName: {
    type: String,
    required: "Can't add without channel name"
  },
  channelImageURL: {
    type: mongoose.SchemaTypes.Url,
    required: true
  },
  publishedDate: {
    type: String,
    required: "Can't add without published date"
  },
  viewCount: {
    type: Number,
    required: "Can't add without view count"
  },
  likeCount: {
    type: Number,
    required: "Can't add without like count"
  },
  dislikeCount: {
    type: Number,
    required: "Can't add without dislike count"
  },
  commentCount: {
    type: Number,
    required: "Can't add without comment count"
  }
}, { timestamps: true });

const Video = mongoose.model("Video", VideoSchema);
module.exports = { Video }