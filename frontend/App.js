import {createContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LogMoodScreen from './LogMood';
import Notification from './Notification';
import LoginScreen from "./screens/LoginScreen";

const Tab = createBottomTabNavigator();
const UserContext = createContext(null);

export default function App() {
    const [user, setUser] = useState({name: "", email: ""});
    return (
        <UserContext.Provider value={user}>
            {user.email
                ? <NavigationContainer>
                    <Tab.Navigator>
                        <Tab.Screen name="Log Mood" component={LogMoodScreen}/>
                        <Tab.Screen name="Notifications" component={Notification}/>
                    </Tab.Navigator>
                </NavigationContainer>
                : <LoginScreen setUser={setUser}/>
            }
        </UserContext.Provider>
    );

}


