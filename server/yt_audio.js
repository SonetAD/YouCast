const ytdl = require('ytdl-core');

const convertVideoToAudio = (url, res) => {
  try {
    ytdl(url, {
      quality: 'highestaudio',
      filter: 'audioonly',
    }).pipe(res);
  } catch (er) {
    throw new Error('Error converting vidoe to audio');
  }
};

module.exports = convertVideoToAudio;
