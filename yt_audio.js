const ytdl = require('ytdl-core');

const convertVideoToAudio = (vId, res) => {
  try {
    const url = `http://www.youtube.com/watch?v=${vId}`;
    res.setHeader('Content-Type', 'audio/mpeg');
    ytdl(url, {
      quality: 'highestaudio',
      filter: 'audioonly',
    }).pipe(res);
  } catch (er) {
    throw new Error('Error converting vidoe to audio');
  }
};

module.exports = convertVideoToAudio;
