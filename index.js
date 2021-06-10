const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const { initializeDBConnection } = require('./config/db.connect');
const { seedVideos } = require('./utils/seedVideos')

const app = express();
app.use(bodyParser.json())
app.use(cors())

initializeDBConnection();
// seedVideos();

const videosRouter = require('./routers/videos.router')

app.get('/', (req, res) => {
  res.send('Welcome to capewatch')
});

app.use("/videos", videosRouter)

app.listen(3000, () => {
  console.log('server started');
});