import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';

const CustomActivityIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

export default CustomActivityIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
