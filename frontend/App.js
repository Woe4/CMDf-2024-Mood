import {createContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LogMoodScreen from './LogMood';
import generateNotification from './Notification';
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from './Home';

const Tab = createBottomTabNavigator();
export const UserContext = createContext(null);

export default function App() {
    generateNotification();

    const [user, setUser] = useState({name: "", email: ""});
    return (
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
    );

}

