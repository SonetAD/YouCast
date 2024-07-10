const ytdl = require('ytdl-core');
const axios = require('axios');

const ytAudio = async (vId, res) => {
  const url = `http://www.youtube.com/watch?v=${vId}`;

  const fetchAudioStream = async () => {
    try {
      console.log('Setting header');
      res.setHeader('Content-Type', 'audio/mpeg');

      console.log('Fetching video');
      const stream = ytdl(url, {
        filter: 'audioonly',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
        },
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

  // Retry mechanism with exponential backoff
  let attemptCount = 0;
  const maxAttempts = 3; // Maximum number of retry attempts

  const retryFetchAudioStream = async () => {
    attemptCount++;
    if (attemptCount > maxAttempts) {
      console.error('Max retry attempts reached');
      return;
    }

    try {
      await fetchAudioStream();
    } catch (error) {
      if (error.message.includes('MinigetError: Status code: 403')) {
        console.log(`Retrying due to rate limit... Attempt ${attemptCount}`);
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, attemptCount) * 1000)
        );
        return retryFetchAudioStream(); // Retry the request
      } else {
        throw error;
      }
    }
  };

  retryFetchAudioStream();
};

module.exports = ytAudio;
