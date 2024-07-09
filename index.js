const express = require('express');
const search = require('./search_youtube');
const ytAudio = require('./yt_audio');
const compression = require('compression');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');

const app = express();
const port = 3000;
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  validate: {
    xForwardedForHeader: false,
  },
});
app.use(limiter);

app.use(helmet());
app.use(compression());

app.get('/search/:userSearch', async (req, res) => {
  try {
    const searchRes = await search(req.params.userSearch);
    res.json(searchRes);
  } catch (error) {
    throw new Error(error.message);
  }
});

app.get('/ytaudio/:vId', (req, res) => {
  try {
    ytAudio(req.params.vId, res);
  } catch (error) {
    throw new Error(error.message);
  }
});

const errorHandle = (err, req, res, next) => {
  res.status(500).send(err.message);
};
app.use(errorHandle);

app.listen(port);
