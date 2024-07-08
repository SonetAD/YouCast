import {
  Alert,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Search} from '../libs/youtube';
import Card from '../components/Card';
import SearchResultHeader from '../components/SearchResultHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import {SetData} from '../libs/local_storage';
import {Constants} from '../constants';
import {TrackBuilder} from '../libs/trackbuilder';

const SearchResultScreen = ({route, navigation}) => {
  const {searchParams} = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [trackList, setTrackList] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await Search(searchParams);
        setTrackList(res);
        setIsLoading(false);
        SetData(Constants.searchHistory, res);
      } catch {
        Alert.alert('Oops!', 'Something went wrong.Please try again', [
          {
            text: 'Ok',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      }
    })();
  }, [navigation, searchParams]);

  const handlePress = (index: number) => {
    const item = trackList[index];
    const trackData = {
      vId: item.id,
      title: item.title,
      artist: item.channel.name,
      duration: item.duration,
      date: item.uploaded,
      thumbnail: item.thumbnail,
    };
    navigation.navigate(Constants.PlayerScreen, {
      playListData: trackData,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#20202a" />
      {isLoading ? (
        <CustomActivityIndicator />
      ) : (
        <View>
          <SearchResultHeader
            totalItem={trackList.length}
            resetSearch={() => {
              navigation.goBack();
            }}
          />
          <FlatList
            data={trackList}
            keyExtractor={video => video.id.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity onPress={() => handlePress(index)}>
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
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171b1c',
  },
});
