import {
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavContext} from '../contexts/NavContext';
import {Constants} from '../constants';

const SearchScreen = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const showErrorMessage = message => {
    setErrorMessage(message);
    setErrorVisible(true);
    setTimeout(() => {
      setErrorVisible(false);
    }, 1500);
  };
  const globalNavigation = useContext(NavContext);

  const searchOnPress = () => {
    if (searchInput) {
      globalNavigation.navigate(Constants.SearchResult, {
        searchParams: searchInput,
      });
      setSearchInput('');
    } else {
      showErrorMessage('Please enter a search keyword');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#20202a" />

      <View style={styles.search}>
        <TextInput
          onSubmitEditing={searchOnPress}
          style={styles.input}
          value={searchInput}
          onChangeText={txt => setSearchInput(txt)}
          placeholder="Search Music"
          placeholderTextColor="gray"
          returnKeyType="search"
        />

        <TouchableOpacity style={styles.btn} onPress={searchOnPress}>
          <Text style={styles.txt}>Search</Text>
        </TouchableOpacity>
        <Animated.View
          style={[styles.errorContainer, {opacity: errorVisible ? 1 : 0}]}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

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
});
