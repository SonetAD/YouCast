import axios from 'axios';
import {Constants} from '../constants';

const {apiUrl} = Constants;
export const Search = async (userSearch: string) => {
  try {
    const url = `${apiUrl}/search/${userSearch}`;
    const res = await axios.get(url);
    return res.data;
    return res;
  } catch (err) {
    throw new Error('Seero while searching on youtube');
  }
};
