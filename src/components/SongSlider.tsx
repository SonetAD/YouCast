import Slider from '@react-native-community/slider';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useProgress} from 'react-native-track-player';

const SongSlider = () => {
  const {position, duration} = useProgress();

  const convertSeconds = seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.round(seconds % 60);

    let timeString;
    if (hours > 0) {
      timeString = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    } else if (minutes > 0) {
      timeString = `${minutes.toString().padStart(2, '0')}:${remainingSeconds
        .toString()
        .padStart(2, '0')}`;
    } else {
      timeString = `0:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    return timeString;
  };
  return (
    <View>
      <Slider
        value={position}
        minimumValue={0}
        maximumValue={duration}
        thumbTintColor="#FFF"
        maximumTrackTintColor="#FFF"
        style={styles.sliderContainer}
      />
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{convertSeconds(position)}</Text>
        <Text style={styles.time}>{convertSeconds(duration - position)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    width: 350,
    height: 40,
    marginTop: 25,

    flexDirection: 'row',
  },
  timeContainer: {
    width: 340,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    color: '#fff',
  },
});

export default SongSlider;
