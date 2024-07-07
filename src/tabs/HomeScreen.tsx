import {
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

const HomeScreen = () => {
  const [searchHistory, setSearchHistory] = useState();
  const [searchText, setSearchText] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const gethistory = await GetData(Constants.searchHistory);
        setSearchHistory(gethistory);
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
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#20202a" />
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={searchText}
          onChangeText={text => setSearchText(text)}
          onSubmitEditing={searchOnPress}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchOnPress}>
          <Icon name="search" size={24} color="black" />
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
          renderItem={({item}) => (
            <TrackPreview
              title={item.title}
              channelName={item.channel.name}
              thumbnail={item.thumbnail}
              vId={item.id}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171b1c',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 30,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
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
