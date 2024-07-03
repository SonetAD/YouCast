import React, {PropsWithChildren} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import VerifiedIcon from 'react-native-vector-icons/MaterialIcons';
import EyeIcon from 'react-native-vector-icons/AntDesign';
import CalanderIcon from 'react-native-vector-icons/Fontisto';
import {TrackBuilder} from '../libs/trackbuilder';
import {AddTrack} from '../services/player_service';
import TrackPlayer from 'react-native-track-player';

type TrackPreviewProps = PropsWithChildren<{
  title: string;
  channelName: string;
  channelIcon: string;
  verifiedChannel: boolean;
  thumbnail: string;
  duration: string;
  durationSec: number;
  views: number;
  uploadDate: string;
  vId: string;
}>;

const TrackPreview: React.FC<TrackPreviewProps> = ({
  title,
  channelName,
  channelIcon,
  verifiedChannel,
  thumbnail,
  duration,
  durationSec,
  views,
  uploadDate,
  vId,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const iconSize = screenWidth * 0.05; // 5% of the screen width

  const trimmedTitle =
    title.length > 60 ? `${title.substring(0, 57)}...` : title;
  const trimmedArtist =
    channelName.length > 30
      ? `${channelName.substring(0, 27)}...`
      : channelName;

  const formatViewCount = (views: number): string => {
    if (views >= 1000000000) {
      return (views / 1000000000).toFixed(1) + 'B';
    }
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + 'M';
    }
    if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'K';
    }

    return views.toString();
  };

  const numberWithCommas = (x: number | string): string =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const handlePress = async () => {
    try {
      const trackData = {
        vId: vId,
        title: title,
        artist: channelName,
        duration: durationSec,
        date: uploadDate,
        thumbnail: thumbnail,
      };
      const track = await TrackBuilder(trackData);
      await AddTrack(track);
      TrackPlayer.play();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.preview}>
        <Image source={{uri: thumbnail}} style={styles.thumbnail} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{trimmedTitle}</Text>
          <View style={styles.iconContainer}>
            <Image
              source={{uri: channelIcon}}
              style={[
                styles.channelIcon,
                styles.iconStyle,
                {width: iconSize, height: iconSize},
              ]}
            />
            <Text style={styles.artist}>{trimmedArtist}</Text>
            {verifiedChannel && (
              <VerifiedIcon
                name="verified-user"
                style={[styles.iconStyle, {width: iconSize, height: iconSize}]}
              />
            )}
          </View>
          <View style={styles.statContainer}>
            <View style={styles.statItem}>
              <EyeIcon name="eye" color="#ffffff" />
              <Text style={styles.txt}>
                {numberWithCommas(formatViewCount(views))}
              </Text>
            </View>
            <View style={styles.statItem}>
              <CalanderIcon name="calendar" color="#ffff" />
              <Text style={styles.txt}>{uploadDate}</Text>
            </View>
          </View>
        </View>
        <View style={styles.durationContainer}>
          <Icon name="clockcircleo" size={20} color="#fff" />
          <Text style={styles.duration}>{duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  preview: {
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
    marginVertical: 15,
    width: '95%', // Responsive width
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  detailsContainer: {
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  iconStyle: {
    resizeMode: 'contain',
    marginRight: 5, // Space between icon and text
  },
  statContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  artist: {
    fontSize: 14,
    color: '#ccc',
    marginLeft: 5,
  },
  durationContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  duration: {
    fontSize: 12,
    color: '#fff',
  },
  channelIcon: {
    borderRadius: 50,
    marginHorizontal: 10,
  },
  txt: {
    color: '#ffffff',
    marginLeft: 5,
  },
});

export default TrackPreview;
