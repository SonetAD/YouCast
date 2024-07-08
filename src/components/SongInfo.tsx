import React, {PropsWithChildren} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Track} from 'react-native-track-player';

type SongInfoProps = PropsWithChildren<{
  track: Track | null | undefined;
}>;

const SongInfo = ({track}: SongInfoProps) => {
  const trimmedTitle =
    track?.title.length > 15
      ? `${track?.title.substring(0, 12)}...`
      : track?.title;
  const trimmedArtist =
    track?.artist.length > 15
      ? `${track?.artist.substring(0, 12)}...`
      : track?.artist;
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>{trimmedTitle}</Text>
        <Text style={styles.artist}>
          {trimmedArtist} . {track?.album}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: 18,

    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  name: {
    marginBottom: 8,
    textAlign: 'center',

    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
  },
  artist: {
    color: '#d9d9d9',
    textAlign: 'center',
  },
});

export default SongInfo;
