import React, {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';

import TrackPlayer, {Track} from 'react-native-track-player';
import SongInfo from '../components/SongInfo';
import SongSlider from '../components/SongSlider';
import ControlCenter from '../components/ControlCenter';
import {AddTrack} from '../services/player_service';
import {TrackBuilder} from '../libs/trackbuilder';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');

const PlayerScren = ({route, navigation}) => {
  const {playListData} = route.params;
  console.log(playListData);
  const [track, setTrack] = useState<Track | null>();

  useEffect(() => {
    (async () => {
      const track = await TrackBuilder(playListData);
      await AddTrack(track);
      const currentTrack = await TrackPlayer.getActiveTrack();
      setTrack(currentTrack);
    })();
  }, [playListData]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#20202a" />
      <View style={styles.listArtWrapper}>
        <View style={styles.albumContainer}>
          {track?.artwork && (
            <Image style={styles.albumArtImg} source={{uri: track?.artwork}} />
          )}
        </View>
      </View>
      <SongInfo track={track} />
      <SongSlider />
      <ControlCenter navigation={navigation} />
    </SafeAreaView>
  );
};
export default PlayerScren;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#171b1c',
  },
  listArtWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumContainer: {
    width: 300,
    height: 300,
  },
  albumArtImg: {
    height: '100%',
    borderRadius: 10,
  },
});
