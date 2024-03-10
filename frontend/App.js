import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogMoodScreen from './LogMood';
import HomeScreen from './Home';
import generateNotification from './Notification';

const Tab = createBottomTabNavigator();

import React from 'react';
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "http://128.189.91.71:5002/graphql",
  cache: new InMemoryCache()
});

export default function App() {
  generateNotification();

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name = "Home" component = {HomeScreen}/>
          <Tab.Screen name = "Log Mood" component = {LogMoodScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('MoodTracker', () => App);
