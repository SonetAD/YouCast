import {
  ActivityIndicator,
  Animated,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GetData} from '../libs/local_storage';
import {Constants} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavContext} from '../contexts/NavContext';
import TrackPreview from '../components/TrackPreview';
import {SetUpPlayer} from '../services/player_service';
import {Search} from '../libs/youtube';

const HomeScreen = ({navigation}) => {
  const [searchHistory, setSearchHistory] = useState();
  const [searchText, setSearchText] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await SetUpPlayer();
        const gethistory = await GetData(Constants.searchHistory);
        if (!gethistory) {
          const firstSearch = await Search(
            'Taiylor Swift,Beyonce,Rihana,Justin Bieber, Ed Sharan song music',
          );
          setSearchHistory(firstSearch);
          setIsLoading(false);
        } else {
          setSearchHistory(gethistory);
          setIsLoading(false);
        }
      } catch {
        console.log('eror');
      }
    })();
  }, []);
  const globalNavigation = useContext(NavContext);

  const showErrorMessage = message => {
    setErrorMessage(message);
    setErrorVisible(true);
    setTimeout(() => {
      setErrorVisible(false);
    }, 1500);
  };

  const searchOnPress = () => {
    if (searchText) {
      globalNavigation.navigate(Constants.SearchResult, {
        searchParams: searchText,
      });
      setSearchText('');
    } else {
      showErrorMessage('Please enter a search keyword');
    }
  };

  const handlePress = (index: number) => {
    const item = searchHistory[index];
    const trackData = {
      vId: item.id,
      title: item.title,
      artist: item.channel.name,
      duration: item.duration,
      date: item.uploaded,
      thumbnail: item.thumbnail,
    };
    globalNavigation.navigate(Constants.PlayerScreen, {
      playListData: trackData,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#20202a" />
      {isLoading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.input}
              placeholder="Search..."
              value={searchText}
              onChangeText={text => setSearchText(text)}
              onSubmitEditing={searchOnPress}
              returnKeyType="search"
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={searchOnPress}>
              <Icon name="search" size={24} color="#fff" />
            </TouchableOpacity>
            <Animated.View
              style={[styles.errorContainer, {opacity: errorVisible ? 1 : 0}]}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </Animated.View>
          </View>
          <View style={styles.cardContainer}>
            <FlatList
              numColumns={2}
              data={searchHistory}
              keyExtractor={video => video.id.toString()}
              renderItem={({item, index}) => (
                <TouchableOpacity onPress={() => handlePress(index)}>
                  <TrackPreview
                    title={item.title}
                    channelName={item.channel.name}
                    thumbnail={item.thumbnail}
                    vId={item.id}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171b1c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    width: '80%',
    marginVertical: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
  },
  searchButton: {
    padding: 10,
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'red',
    paddingVertical: 10,
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
