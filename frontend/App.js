import { useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogMoodScreen from './LogMood';
import Notification from './Notification';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SentimentScreen from './screens/SentimentScreen';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name = "Home" component = {HomeScreen}/>
        <Tab.Screen name = "Log Mood" component = {LogMoodScreen}/>
        <Tab.Screen name = "Notifications" component = {Notification}/>
      </Tab.Navigator>
    </NavigationContainer>
  );

}


