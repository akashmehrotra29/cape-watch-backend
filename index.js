const express = require('express');

const { initializeDBConnection } = require("./config/db.connect");

const app = express();

initializeDBConnection();

app.get('/', (req, res) => {
  res.send('Welcome to capewatch')
});

app.listen(3000, () => {
  console.log('server started');
});