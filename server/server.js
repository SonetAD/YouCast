const express = require('express');
const search = require('./search_youtube');
const ytAudio = require('./yt_audio');

const app = express();

app.get('/search/:userSearch', async (req, res) => {
  try {
    const searchRes = await search(req.params.userSearch);
    res.json(searchRes);
  } catch (error) {
    throw new Error(error.message);
  }
});

app.get('/ytaudio:url', (req, res) => {
  try {
    ytAudio(req.params.url);
  } catch (error) {
    throw new Error(error.message);
  }
});

const errorHandle = (err, req, res, next) => {
  res.status(500).send(err.message);
};
app.use(errorHandle);

app.listen(3000, () => {
  console.log('ser is ready');
});
