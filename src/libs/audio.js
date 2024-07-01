// YouTube video ID
var videoID = 'jl-LykdDi7I';

// Fetch video info (using a proxy if avoid CORS errors)
fetch('https://www.youtube.com/get_video_info?video_id=' + videoID).then(
  response => {
    console.log(response);
    if (response.ok) {
      response.text().then(ytData => {
        // parse response to find audio info
        var ytData = parse_str(ytData);
        var getAdaptiveFormats = JSON.parse(ytData.player_response)
          .streamingData.adaptiveFormats;
        var findAudioInfo = getAdaptiveFormats.findIndex(
          obj => obj.audioQuality,
        );

        // get the URL for the audio file
        var audioURL = getAdaptiveFormats[findAudioInfo].url;

        console.log(audioURL);
        console.log('fuck');
        // update the <audio> element src
      });
    }
  },
);

function parse_str(str) {
  return str.split('&').reduce(function (params, param) {
    var paramSplit = param.split('=').map(function (value) {
      return decodeURIComponent(value.replace('+', ' '));
    });
    params[paramSplit[0]] = paramSplit[1];
    return params;
  }, {});
}
