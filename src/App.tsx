import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Constants} from './constants';
import TabScreen from './screens/TabScreen';
import SearchResultScreen from './screens/SearchResultScreen';
import PlayerScreen from './screens/PlayerScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Constants.TabScreen}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={Constants.TabScreen} component={TabScreen} />
        <Stack.Screen
          name={Constants.SearchResult}
          component={SearchResultScreen}
        />
        <Stack.Screen name={Constants.PlayerScreen} component={PlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
