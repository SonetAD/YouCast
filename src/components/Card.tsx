import React, {PropsWithChildren} from 'react';
import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import VerifiedIcon from 'react-native-vector-icons/MaterialIcons';
import EyeIcon from 'react-native-vector-icons/AntDesign';
import CalanderIcon from 'react-native-vector-icons/Fontisto';

type CardProps = PropsWithChildren<{
  title: string;
  channelName: string;
  channelIcon: string;
  verifiedChannel: boolean;
  thumbnail: string;
  duration: string;
  views: number;
  uploadDate: string;
}>;

const Card: React.FC<CardProps> = ({
  title,
  channelName,
  channelIcon,
  verifiedChannel,
  thumbnail,
  duration,
  views,
  uploadDate,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const iconSize = screenWidth * 0.05; // 5% of the screen width

  const trimmedTitle =
    title.length > 15 ? `${title.substring(0, 12)}...` : title;
  const trimmedArtist =
    channelName.length > 15
      ? `${channelName.substring(0, 12)}...`
      : channelName;

  // Function to format views
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

  // Function to format numbers with commas
  const numberWithCommas = (x: number | string): string =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <View style={styles.card}>
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
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
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
    height: 100,
    width: 100,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    flexDirection: 'column',
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
  },
  durationContainer: {
    marginLeft: 10,
  },
  duration: {
    fontSize: 16,
    color: '#fff',
  },
  channelIcon: {
    borderRadius: 50,
    marginHorizontal: 10,
  },
  txt: {
    color: '#ffffff',
  },
});

export default Card;
