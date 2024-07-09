const ytdl = require('ytdl-core');

const convertVideoToAudio = async (vId, res) => {
  try {
    const url = `http://www.youtube.com/watch?v=${vId}`;
    res.setHeader('Content-Type', 'audio/mpeg');
    await ytdl(url, {
      quality: 'lowestaudio',
      filter: 'audioonly',
    }).pipe(res);
  } catch (err) {
    console.log(err);
  }
};

module.exports = convertVideoToAudio;
