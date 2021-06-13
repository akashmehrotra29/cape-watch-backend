const { User } = require('../models/user.model');
const { Playlist } = require('../models/playlist.model');
const bcrypt = require('bcrypt');
const { extend } = require('lodash');
const jwt = require('jsonwebtoken');

const findUser = async (req, res) => {
  try { 
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      if (bcrypt.compareSync(password, user.password)) { // add salt
        const token = jwt.sign({ _id: user._id, name: user.name }, process.env['JWT_SECRET'], { expiresIn: "24h" });
        
        res.json({ success: true, token , message: "Successfully logged in" })
      } else {
        res.json({ success: false, token: null, message: "Incorrect password. Please try again" });
      }  
    }

    res.json({ success: false, token: null, message: "The account does not exist. Please signup" });
  } catch(error) {
    res.json({ success: false, token: null, message: "Can't login. Something went wrong" });
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
      res.json({ success: false, message: "Account with this email already exist. Try to login" });
    } else {
      let newUser = new User({ name, email, password });
      
      newUser.password = bcrypt.hashSync(newUser.password, 10); //add salt
      const savedUser = await newUser.save();

      defaultPlaylists.forEach(async playlist => {
        const newPlaylist = new Playlist({ user: savedUser._id, name: playlist.name, videos: [] });
        await newPlaylist.save();
      })

      res.json({ success: true, user: savedUser, message: "Signed up Successfully" });
    }
  }
   catch {
    res.json({ user: null, success: false, message: "Can't signup. Something went wrong" });
  } 
}

const updateUser = async (req, res) => {
  try {
    const updatedUser = req.body;
    let user = await User.findById(updatedUser.id);

    const isEmailPresent = await User.findOne({ email: updatedUser.email })
    if (isEmailPresent) {
      return res.json({ success: false, message: "User with same email already exist" });
    }
    
    // user = extend(user, updatedUser);
    // user.updatedAt = Date();
    // user = await user.save();
    
    if(user.id === updatedUser.id) {
      Object.keys(updatedUser).forEach((key) => {
        if(key in user) {
          user[key] = updatedUser[key];
        }
      });
      user["password"] = bcrypt.hashSync(updatedUser.password, 10); // add salt
      user["updatedAt"] = Date();
    }
    await user.save();
    
    user.password = undefined;
    res.json({ success: true, user, message: "User credentials updated successfully" })
  } catch(error) {
    res.json({ success: false, message: "Can't update user. Something went wrong."})
  }
}

module.exports = { findUser, registerUser, updateUser };