const {youtube} = require('scrape-youtube');

const search = async userSearch => {
  try {
    const {videos} = await youtube.search(userSearch);
    console.log(videos[0]);
    return videos;
  } catch (err) {
    throw new Error('Error searching on youtube');
  }
};

search('justin biber baby');
module.exports = search;
