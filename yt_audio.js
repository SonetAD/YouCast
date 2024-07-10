const ytdl = require('ytdl-core');

const ytAudio = async (vId, res) => {
  try {
    const url = `http://www.youtube.com/watch?v=${vId}`;
    console.log('Setting header');
    res.setHeader('Content-Type', 'audio/mpeg');

    console.log('Fetching video');
    const stream = ytdl(url, {
      filter: 'audioonly',
      // headers: {
      //   'User-Agent':
      //     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
      // },
    });

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
