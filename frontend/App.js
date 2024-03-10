import { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogMoodScreen from './LogMood';
import generateNotification from './Notification';
import { Linking } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';
import PushNotification from 'react-native-push-notification';

const Tab = createBottomTabNavigator();

export default function App() {
  generateNotification();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name = "LogMood" component = {LogMoodScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );

}


