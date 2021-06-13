const routeHandler = (req, res) => {
  res.status(404).json({ success: false, message: "This route does not exist" });
};

module.exports = routeHandler;