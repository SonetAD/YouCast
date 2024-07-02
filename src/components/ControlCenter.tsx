import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';

const ControlCenter = () => {
  const playBackState = usePlaybackState();

  const nextBtn = async () => {
    await TrackPlayer.skipToNext();
  };

  cosnt nrevBtn=async ()=>{
    await TrackPlayer.skipToPrevious()
  }

  return (
    <View>
      <Text>ControlCenter</Text>
    </View>
  );
};

export default ControlCenter;

const styles = StyleSheet.create({});
