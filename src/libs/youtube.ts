import axios from 'axios';
import {Constants} from '../constants';

const {apiUrl} = Constants;
export const Search = async (userSearch: string) => {
  try {
    const url = `${apiUrl}/search/${userSearch}`;
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw new Error('Seero while searching on youtube');
  }
};

export const ConvertAudio = async (vId: string) => {
  try {
    const url = `${apiUrl}/ytaudio/${vId}`;
    console.log(url);
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.log('fuck me');
    throw new Error('Server error; converting Audio');
  }
};
