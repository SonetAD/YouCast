import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Pressable, ActivityIndicator} from 'react-native';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {GetData} from '../libs/local_storage';
import {Constants} from '../constants';

const ControlCenter = ({navigation}) => {
  const [isBuffer, setIsBuffer] = useState(true);
  const playBackState = usePlaybackState();

  useEffect(() => {
    (async () => {
      try {
        if (playBackState.state === State.Buffering) {
          setIsBuffer(true);
        } else {
          setIsBuffer(false);
          if (playBackState.state === State.Ready) {
            await TrackPlayer.play();
          }
          if (playBackState.state === State.Ended) {
            skipToNext();
          }
        }
      } catch {}
    })();
  }, [playBackState]);

  const loadTrackFromSearchHistory = async () => {
    try {
      const trackList = await GetData(Constants.searchHistory);
      const currentTrack = await TrackPlayer.getActiveTrack();
      const currentTrackIndex = trackList.findIndex(
        track => track.id === currentTrack.id,
      );
      const res = {
        trackList: trackList,
        index: currentTrackIndex,
      };
      return res;
    } catch (err) {
      throw err;
    }
  };

  // next button
  const skipToNext = async () => {
    try {
      const {trackList, index} = await loadTrackFromSearchHistory();
      if (trackList[index]) {
        const item = trackList[index + 1];
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
      }
    } catch {}
  };
  // Previous button
  const skipToPrevious = async () => {
    try {
      const {trackList, index} = await loadTrackFromSearchHistory();
      if (trackList[index]) {
        const item = trackList[index - 1];
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
      }
    } catch {}
  };

  const togglePlayback = async (playback: State) => {
    const currentTrack = await TrackPlayer.getActiveTrack();

    if (currentTrack !== null) {
      if (playback.state === State.Paused) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={skipToPrevious}>
        <Icon style={styles.icon} name="skip-previous" size={40} />
      </Pressable>
      <Pressable onPress={() => togglePlayback(playBackState)}>
        {isBuffer ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : (
          <Icon
            style={styles.icon}
            name={
              playBackState.state === State.Playing ? 'pause' : 'play-arrow'
            }
            size={50}
          />
        )}
      </Pressable>
      <Pressable onPress={skipToNext}>
        <Icon style={styles.icon} name="skip-next" size={40} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#FFFFFF',
  },
  playButton: {
    marginHorizontal: 24,
  },
});

export default ControlCenter;
