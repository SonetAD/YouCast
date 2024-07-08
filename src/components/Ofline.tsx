import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Ofline = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Icon name="wifi-off" color="#fff" size={60} />
      <Text style={styles.txt}>No Internet Connection</Text>
    </SafeAreaView>
  );
};

export default Ofline;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171b1c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
});
