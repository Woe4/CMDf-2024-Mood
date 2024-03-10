import { useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogMoodScreen from './LogMood';
import Notification from './Notification';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name = "Log Mood" component = {LogMoodScreen}/>
        <Tab.Screen name = "Notifications" component = {Notification}/>
      </Tab.Navigator>
    </NavigationContainer>
  );

}


