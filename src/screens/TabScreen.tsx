import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../tabs/HomeScreen';
import SearchScreen from '../tabs/SearchScreen';
import {Constants} from '../constants';
import NavContextProvider from '../contexts/NavContext';
import FeedbackScreen from '../tabs/Feedback';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (route, focused, color, size) => {
  let iconName;
  if (route.name === Constants.Home) {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === Constants.Search) {
    iconName = focused ? 'search' : 'search-outline';
  } else if (route.name === Constants.Feedback) {
    iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
  }
  return <Icon name={iconName} size={size} color={color} />;
};

const TabScreen = ({navigation}) => {
  return (
    <NavContextProvider value={navigation}>
      <Tab.Navigator
        initialRouteName={Constants.Home}
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color, size}) =>
            getTabBarIcon(route, focused, color, size),
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#b0b0b0', // Lighter shade of grey for better visibility
          tabBarLabelStyle: {paddingBottom: 10, fontSize: 12},
          tabBarStyle: {padding: 10, height: 70, backgroundColor: '#1f2324'},
        })}>
        <Tab.Screen
          name={Constants.Home}
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name={Constants.Search}
          component={SearchScreen}
          options={{
            tabBarLabel: 'Search',
          }}
        />

        <Tab.Screen
          name={Constants.Feedback}
          component={FeedbackScreen}
          options={{
            tabBarLabel: 'Feedback',
          }}
        />
      </Tab.Navigator>
    </NavContextProvider>
  );
};

export default TabScreen;
