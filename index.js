const express = require('express');

const { initializeDBConnection } = require("./config/db.connect");
const { seedVideos } = require('./utils/seedVideos')

const app = express();

initializeDBConnection();
seedVideos();

app.get('/', (req, res) => {
  res.send('Welcome to capewatch')
});

app.listen(3000, () => {
  console.log('server started');
});