import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {Search} from './libs/youtube';
import Card from './components/Card';
import SearchResultHeader from './components/SearchResultHeader';
import {SetUpPlayer} from './services/player_service';
import {GetData, SetData} from './libs/local_storage';
import {Constants} from './constants';
import TrackPreview from './components/TrackPreview';

const App = () => {
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [songList, setSongList] = useState([]);
  const searchHistory = useRef(['']);

  const setUp = async () => {
    const isSetUp = await SetUpPlayer();
    console.log(isSetUp);
    setIsLoading(!isSetUp);
  };

  useEffect(() => {
    (async () => {
      try {
        await setUp();
        const getHistory = await GetData(Constants.searchHistory);
        console.log('fetching history', getHistory);
        if (getHistory.length > 0) {
          const buildSongList = [];
          for (let i = 0; i < getHistory.length; i++) {
            if (getHistory[i]) {
              const res = await Search(getHistory[i]);
              buildSongList.push(...res);
            }
          }
          setSongList(buildSongList);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const searchOnPress = async () => {
    try {
      if (!searchInput.trim()) {
        Alert.alert('Oops!', 'Please enter something to search');
        return;
      }

      if (searchHistory.current.length >= 10) {
        searchHistory.current.shift();
      }

      searchHistory.current.unshift(searchInput);
      await SetData(Constants.searchHistory, searchHistory.current);

      setIsLoading(true);
      const res = await Search(searchInput);
      if (res && res.length > 0) {
        setSongList(res);
        setIsLoading(false);
      } else {
        Alert.alert('Oops!', 'Something went wrong. Please try again');
        resetSearch();
      }
    } catch (error) {
      Alert.alert('Opps!', 'Something Went wrong');
    }
  };

  const resetSearch = () => {
    setSearchInput('');
    setIsLoading(false);
    setSongList([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#20202a" />
      {isLoading ? (
        <ActivityIndicator color="#ffffff" size="large" style={styles.search} />
      ) : (
        <>
          {songList.length > 0 ? (
            <>
              {searchHistory.current.length <= 0 ? (
                <View>
                  <SearchResultHeader
                    totalItem={songList.length}
                    resetSearch={resetSearch}
                  />
                  <FlatList
                    data={songList}
                    keyExtractor={video => video.id.toString()}
                    renderItem={({item}) => (
                      <Card
                        title={item.title}
                        channelName={item.channel.name}
                        channelIcon={item.channel.thumbnail}
                        verifiedChannel={item.channel.verified}
                        thumbnail={item.thumbnail}
                        duration={item.durationString}
                        views={item.views}
                        uploadDate={item.uploaded}
                        vId={item.id}
                        durationSec={item.duration}
                      />
                    )}
                  />
                </View>
              ) : (
                <View>
                  <View style={styles.dynamicSearchBar}>
                    <TextInput
                      onEndEditing={searchOnPress}
                      style={styles.input}
                      value={searchInput}
                      onChangeText={txt => setSearchInput(txt)}
                      placeholder="Search Music"
                      placeholderTextColor="gray"
                    />
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={searchOnPress}>
                      <Text style={styles.txt}>Search</Text>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={songList}
                    keyExtractor={video => video.id.toString()}
                    renderItem={({item}) => (
                      <TrackPreview
                        title={item.title}
                        channelName={item.channel.name}
                        channelIcon={item.channel.thumbnail}
                        verifiedChannel={item.channel.verified}
                        thumbnail={item.thumbnail}
                        duration={item.durationString}
                        views={item.views}
                        uploadDate={item.uploaded}
                        vId={item.id}
                        durationSec={item.duration}
                      />
                    )}
                  />
                </View>
              )}
            </>
          ) : (
            <View style={styles.search}>
              <TextInput
                onEndEditing={searchOnPress}
                style={styles.input}
                value={searchInput}
                onChangeText={txt => setSearchInput(txt)}
                placeholder="Search Music"
                placeholderTextColor="gray"
              />
              <TouchableOpacity style={styles.btn} onPress={searchOnPress}>
                <Text style={styles.txt}>Search</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171b1c',
  },
  search: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderRadius: 10,
    borderColor: '#ffffff',
    borderWidth: 1,
    color: '#ffffff',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 20,
  },
  txt: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dynamicSearchBar: {
    flexDirection: 'row',
  },
});
