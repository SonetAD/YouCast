import AsyncStorage from '@react-native-async-storage/async-storage';

export const SetData = async (key: string, val: any) => {
  const modVal = typeof val === 'string' ? val : JSON.stringify(val);
  try {
    await AsyncStorage.setItem(key, modVal);
  } catch (err) {
    throw new Error('Error saving data on local storage');
  }
};

export const GetData = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (err) {
    throw new Error('Error accessing data from local storage');
  }
};
