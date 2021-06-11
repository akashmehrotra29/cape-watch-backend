const { Playlist } = require('../models/playlist.model');

const createNewPlaylist = async (req, res) => {
  try {
    const newPlaylist = new Playlist (req.body);
    await newPlaylist.save();

    res.json({ success: true, playlist: newPlaylist, message: "New playlist created sucessfully" });
  } catch(error) {
    res.json({ success: false, message: "Failed to create new playlist" })
  }
}

const getUserPlaylists = async (req, res) => {
  try {
    const { userId } = req.params;
    const playlists = await Playlist.find({ user: { _id: userId } });

    res.json({ success: true, playlists });
  } catch (error) {
    res.json({ success: false, message: "Failed to get playlists" });
  }
}

const getPlaylistById = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const playlist = await Playlist.find({ _id: playlistId });
    
    res.json({ success: true, playlist });
  } catch(error) {
    res.json({ success: false, message: "Failed to get playlist" })
  }
}

const updatePlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { videoId } = req.body;
  try {
    const playlist = await Playlist.findOne({ _id: playlistId });
    const isVideoInPlaylist = playlist.videos.includes(videoId);

    isVideoInPlaylist ? playlist.videos.pull(videoId) : playlist.videos.push(videoId);
    await playlist.save();

    res.json({ success: true, updatedPlaylist: playlist,  message: "Playlist updated successfully" })
  } catch(error) {
    res.json({ success: false, message: "Failed to update playlist" })
  }
}

const removePlaylistById = async (req, res) => {
  try {
    const { playlistId } = req.params;
    await Playlist.findByIdAndRemove({ _id: playlistId });

    res.json({ success: true, message: "Playlist removed successfully" })
  } catch(error) {
    res.json({ success: false, message: "Failed to remove playlist" })
  }
}

const updatePlaylistName = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { newName } = req.body;
    const playlist = await Playlist.findOneAndUpdate({ _id: playlistId }, { name: newName });

    res.json({ success: true, playlist, message: "Playlist name updated" })
  } catch(error) {
    res.json({ success: false, message: "Failed to update playlist name" })
  }
}

module.exports = { createNewPlaylist, getUserPlaylists, getPlaylistById, updatePlaylist, removePlaylistById, updatePlaylistName };