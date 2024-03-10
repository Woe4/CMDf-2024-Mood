import {createContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LogMoodScreen from './LogMood';
import generateNotification from './Notification';
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from './Home';

const Tab = createBottomTabNavigator();
export const UserContext = createContext(null);

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

    const [user, setUser] = useState({name: "", email: ""});
    return (
    <ApolloProvider client={client}>
          <UserContext.Provider value={user}>
            {user.email
                ? <NavigationContainer>
                      <Tab.Navigator>
                          <Tab.Screen name="Home" component={HomeScreen}/>
                          <Tab.Screen name="Log Mood" component={LogMoodScreen}/>
                      </Tab.Navigator>
                  </NavigationContainer>
                : <LoginScreen setUser={setUser}/>
            }
        </UserContext.Provider>
      </ApolloProvider>
  );

}

AppRegistry.registerComponent('MoodTracker', () => App);
