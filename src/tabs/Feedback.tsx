import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import {useNetInfo} from '@react-native-community/netinfo';
import Ofline from '../components/Ofline';

const FeedbackScreen = () => {
  const {isConnected} = useNetInfo();
  const [isOfline, setIsOfline] = useState<boolean | null>(false);

  useEffect(() => {
    setIsOfline(!isConnected);
  }, [isConnected]);

  const openMessengerProfile = async () => {
    const messengerURL = 'http://m.me/sonet.adhikary.7';
    const facebookURL = 'https://www.facebook.com/sonet.adhikary.7';
    try {
      await Linking.openURL(messengerURL);
    } catch (error) {
      await Linking.openURL(facebookURL);
    }
  };

  if (isOfline) {
    return <Ofline />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Contribute Your Ideas</Text>
      <TouchableOpacity style={styles.btn} onPress={openMessengerProfile}>
        <Icon name="messenger" color="blue" size={30} />
        <Text style={styles.chatTxt}>Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171b1c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    flexDirection: 'row',
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 20,
  },
  chatTxt: {
    color: '#000',
  },
  txt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
