import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogMoodScreen from './LogMood';
import HomeScreen from './Home';
import generateNotification from './Notification';

const Tab = createBottomTabNavigator();

export default function App() {
  generateNotification();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name = "Home" component = {HomeScreen}/>
        <Tab.Screen name = "Log Mood" component = {LogMoodScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

