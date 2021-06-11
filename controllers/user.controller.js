const { User } = require('../models/user.model');
const { Playlist } = require('../models/playlist.model');

const findUser = async (req, res) => {
  try { 
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      user.password === password ? res.json({ success: true, user, message: "Successfully logged in" }) : res.json({ success: false, user: null, message: "Incorrect password. Please try again" }); 
    }
    res.json({ success: false, user: null, message: "The account does not exist. Please signup" });
  } catch(error) {
    res.json({ success: false, user: null, message: "Can't login. Something went wrong" });
  }
}

const defaultPlaylists = [
  {
    name: 'Liked Videos'
  },
  {
    name: 'Saved Videos',
  },
  {
    name: 'Watch Later Videos',
  }
]

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email: email });
    
    if (user) {
      res.json({ success: false, message: "Account with this email already exist. Typ to login" });
    } else {
      const newUser = new User({ name, email, password });
      const savedUser = await newUser.save();

      defaultPlaylists.forEach(async playlist => {
        const newPlaylist = new Playlist({ user: savedUser._id, name: playlist.name, videos: [] });
        await newPlaylist.save();
      })

      res.json({ success: true, user: savedUser, message: "Signed up Successfully" });
    }
  } catch {
    res.json({ user: null, success: false, message: "Can't signup. Something went wrong" });
  } 
}

module.exports = { findUser, registerUser };