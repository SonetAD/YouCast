import {StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import FloatingActionButton from './FloatingActionButton';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

type SearchResultHeadTxProps = PropsWithChildren<{
  totalItem: number;
  resetSearch(): void;
}>;
const SearchResultHeader = (props: SearchResultHeadTxProps) => {
  return (
    <View style={styles.head}>
      <Text
        style={[
          styles.txt,
          styles.headTxt,
        ]}>{`Total: ${props.totalItem}`}</Text>

      <FloatingActionButton
        action={() => {
          const options = {
            enableVibrateFallback: true,
            ignoreAndroidSystemSettings: false,
          };
          ReactNativeHapticFeedback.trigger('impactLight', options);
          props.resetSearch();
        }}
      />
    </View>
  );
};

export default SearchResultHeader;

const styles = StyleSheet.create({
  head: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30,
  },
  headTxt: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
  },
});
