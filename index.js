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

const userRouter = require('./routers/user.router')
const videosRouter = require('./routers/videos.router')
const playlistsRouter = require('./routers/playlists.router')
const authenticationHandler = require('./middlewares/authenticationHandler.middleware')
const routeHandler = require('./middlewares/routeHandler.middleware')
const errorHandler = require('./middlewares/errorHandler.middleware')

app.get('/', (req, res) => {
  res.send('Welcome to capewatch')
});

app.use("/users", userRouter);
app.use("/videos", videosRouter);
app.use("/playlists", authenticationHandler, playlistsRouter);

app.use(routeHandler);
app.use(errorHandler);

app.listen(3000, () => {
  console.log('server started');
});