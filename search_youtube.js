const { youtube } = require('scrape-youtube');

const search = async (userSearch) => {
  try {
    const { videos } = await youtube.search(userSearch);
    return videos;
  } catch (err) {
    throw new Error('Error searching on youtube');
  }
};

module.exports = search;
