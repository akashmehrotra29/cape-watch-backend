const { User } = require('../models/user.model');
const jwt = require('jsonwebtoken');

const authenticationHandler = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.json({ success: false, message: "Unauthorized access. Token not found" });
    }
    
    token = token.split(" ")[1];   
    const decodedValue = jwt.verify( token, process.env['JWT_SECRET'] );
    const user = await User.findOne({ _id: decodedValue._id });

    if (!user) {
      return res.json({ success: false, message: "Unauthorized access. User not found/ Invalid token" })
    }

    req.user = { _id: decodedValue._id, name: decodedValue.name };
    next();
  } catch(error) {
    res.json({ success: false, message: "Authentication failed." + error.message })
  }
}

module.exports = authenticationHandler;