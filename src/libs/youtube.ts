import axios from 'axios';
import {Constants} from '../constants';

export const Search = async (userSearch: string) => {
  try {
    const {apiUrl} = Constants;
    const url = `${apiUrl}/search/${userSearch}`;
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw new Error('Seero while searching on youtube');
  }
};
