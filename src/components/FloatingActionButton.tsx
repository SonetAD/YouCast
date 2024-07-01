import {TouchableOpacity} from 'react-native';
import React, {PropsWithChildren} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

type Action = PropsWithChildren<{
  action(): void;
}>;

const FloatingActionButton = (props: Action) => {
  return (
    <TouchableOpacity onPress={props.action}>
      <Icon name="burn" size={30} />
    </TouchableOpacity>
  );
};

export default FloatingActionButton;
