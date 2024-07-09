const ytdl = require('ytdl-core');

const convertVideoToAudio = async (vId, res) => {
  try {
    const url = `http://www.youtube.com/watch?v=${vId}`;
    console.log('setting header');
    res.setHeader('Content-Type', 'audio/mpeg');
    console.log('featching video');
    await ytdl(url, {
      quality: 'lowestaudio',
      filter: 'audioonly',
    }).pipe(res);
    console.log('done');
  } catch (err) {
    console.er(err);
  }
};

module.exports = convertVideoToAudio;
