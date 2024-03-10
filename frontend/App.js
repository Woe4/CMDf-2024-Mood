import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogMoodScreen from './screens/LogMoodScreen';
import SentimentScreen from './screens/SentimentScreen';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen
        name="log mood"
        component={LogMoodScreen}
        />
        <Stack.Screen
        name="sentiment"
        component={SentimentScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


