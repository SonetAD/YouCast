import {Track} from 'react-native-track-player';
import {ConvertAudio} from './youtube';

type Params = {
  vId: string;
  title: string;
  artist: string;
  date: string;
  thumbnail: string;
  duration: number;
};
export const TrackBuilder = async (params: Params): Promise<Track> => {
  const audioData = await ConvertAudio(params.vId);
  console.log(typeof audioData);
  const track: Track = {
    url: audioData,
    title: params.title,
    artist: params.artist,
    date: params.date,
    artwork: params.thumbnail,
    duration: params.duration,
  };

  return track;
};
