const express = require('express');
const router = express.Router();
const { 
  createNewPlaylist, 
  getUserPlaylists, 
  getPlaylistById, 
  updatePlaylist, 
  removePlaylistById,
  updatePlaylistName 
  } = require('../controllers/playlists.controller');

router
  .route("/")
  .post(createNewPlaylist);

router
  .route("/:userId")
  .get(getUserPlaylists);

router
  .route("/:playlistId")
  .get(getPlaylistById)
  .post(updatePlaylist)
  .delete(removePlaylistById);

router
  .route("/update/:playlistId")
  .post(updatePlaylistName)

module.exports = router;