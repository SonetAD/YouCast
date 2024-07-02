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
import React, {useState} from 'react';

import {Search} from './libs/youtube';
import Card from './components/Card';
import SearchResultHeader from './components/SearchResultHeader';

const App = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [songList, setSongList] = useState<any>([]);

  const searchOnPress = async () => {
    try {
      if (searchInput) {
        setIsLoading(true);
        const res = await Search(searchInput);
        if (res) {
          setSongList(res);
          setIsLoading(false);
        } else {
          Alert.alert('Oops!', 'Something went wrong.Please try again');
          resetSearch();
        }
      } else {
        Alert.alert('Oops!', 'Please enter something to search');
      }
    } catch (err) {
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
            <View>
              <FlatList
                data={songList}
                keyExtractor={video => video.id}
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
                  />
                )}
                ListHeaderComponent={
                  <SearchResultHeader
                    totalItem={songList.length}
                    resetSearch={resetSearch}
                  />
                }
              />
            </View>
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
});
