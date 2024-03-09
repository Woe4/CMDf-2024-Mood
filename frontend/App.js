import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogMoodScreen from './LogMood';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style = {styles.container}>
      <Text>Welcome home!!</Text>
    </View>
  )
}

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name = "Home" component = {HomeScreen}/>
        <Tab.Screen name = "Log Mood" component = {LogMoodScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF5AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});