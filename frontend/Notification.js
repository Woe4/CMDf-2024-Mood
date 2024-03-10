import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true
  }),
});

export default generateNotification = async() => {
  return (
    Notifications.scheduleNotificationAsync( {
      content: {
        title: "Log your mood now!",
        body: 'How are you feeling today?'
      },
      trigger: {
        // seconds: Math.floor(Math.random() * 10),
        hour: Math.floor(Math.random() * 23) + 0,
        minutes: Math.floor(Math.random() * 59),
        seconds: Math.floor(Math.random() * 59)
      }
    })
  )
}