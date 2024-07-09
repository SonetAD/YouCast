const ytdl = require('ytdl-core');

const ytAudio = async (vId, res) => {
  try {
    const url = `http://www.youtube.com/watch?v=${vId}`;
    console.log('Setting header');
    res.setHeader('Content-Type', 'audio/mpeg');

    console.log('Fetching video');
    const stream = ytdl(url, { filter: 'audioonly' });

    stream.on('error', (err) => {
      console.error('Stream error:', err);
      res.status(500).send('Error streaming audio');
    });

    stream.pipe(res);
    console.log('Streaming audio');
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error processing request');
  }
};

module.exports = ytAudio;
