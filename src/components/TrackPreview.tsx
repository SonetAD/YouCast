import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {PropsWithChildren} from 'react';

type TrackPreviewProps = PropsWithChildren<{
  title: string;
  channelName: string;
  thumbnail: string;
  vId: string;
}>;

const TrackPreview = ({
  title,
  thumbnail,
  channelName,
  vId,
}: TrackPreviewProps) => {
  const trimmedTitle =
    title.length > 15 ? `${title.substring(0, 12)}...` : title;
  const trimmedArtist =
    channelName.length > 15
      ? `${channelName.substring(0, 12)}...`
      : channelName;

  return (
    <View style={styles.card}>
      <Image
        source={{uri: thumbnail}}
        style={styles.image}
        resizeMode="cover"
      />
      <View>
        <Text style={styles.title}>{trimmedTitle}</Text>
        <Text style={styles.channelName}>{trimmedArtist}</Text>
      </View>
    </View>
  );
};

export default TrackPreview;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  image: {
    height: 130,
    borderRadius: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
    textAlign: 'center',
  },
  channelName: {
    marginLeft: 5,
    fontSize: 14,
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
