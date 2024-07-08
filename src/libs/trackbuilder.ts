import {Track} from 'react-native-track-player';
import {ConvertAudio} from './youtube';
import {Constants} from '../constants';

type Params = {
  vId: string;
  title: string;
  artist: string;
  date: string;
  thumbnail: string;
  duration: number;
};
export const TrackBuilder = async (params: Params): Promise<Track> => {
  const url = `${Constants.apiUrl}/ytaudio/${params.vId}`;
  console.log(url);
  const track: Track = {
    id: params.vId,
    url: url,
    title: params.title,
    artist: params.artist,
    date: params.date,
    artwork: params.thumbnail,
    duration: params.duration,
  };

  return track;
};
