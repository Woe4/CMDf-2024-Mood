import React, {useContext, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Calendar} from 'react-native-calendars';
import {UserContext} from "./App";


const Stack = createNativeStackNavigator();

export default function HomeScreenStack() {
    return (
        <Stack.Navigator
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen
                name="home"
                component={HomeScreen}
            />
            <Stack.Screen
                name="stats"
                component={StatsScreen}
            />
            <Stack.Screen
                name="history"
                component={HistoryScreen}
            />
        </Stack.Navigator>
    )
}


function HomeScreen({navigation}) {
    const user = useContext(UserContext);

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-evenly',
                backgroundColor: "#FFF3DA",
            }}>
                <View
                    style={{
                        alignItmes: 'center',
                        justifyContent: 'space-around',
                        backgroundColor: '#FFF3DA',
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        borderColor: 'black',
                        borderWidth: 3,
                        borderRadius: 4
                    }}>
                    <Text style={styles.titleText}>Welcome, {user.name}!</Text>
                </View>
            <Pressable
                style={styles.button}
                onPress={() => navigation.navigate("stats")}>
                <Text>Statistics</Text>
            </Pressable>
        </View>
    )
}


function StatsScreen({navigation}) {

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-evenly',
                backgroundColor: "#FFF3DA"
            }}>
            <View
                style={{
                    alignItmes: 'center',
                    backgroundColor: '#FFF3DA',
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    borderColor: 'black',
                    borderWidth: 3,
                    borderRadius: 4
                }}>
                <Text style={styles.titleText}>Statistics</Text>
            </View>
            <Pressable
                style={styles.button}
                onPress={() => navigation.navigate("history")}>
                <Text style={styles.buttonText}>History</Text>
            </Pressable>
            <Pressable
                style={styles.button}
                onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Back</Text>
            </Pressable>
        </View>
    )
}


function HistoryScreen({navigation}) {
    const [selected, setSelected] = useState('');

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-evenly',
                backgroundColor: "#FFF3DA"
            }}>
            <Text style={styles.titleText}>History</Text>

            {/* <FlatList
        data={[
          {key: 'mango'}
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      /> */}
            <Calendar
                style={{
                    borderWidth: 1,
                    borderColor: 'black',
                    height: 360,
                    width: 350
                }}
                onDayPress={day => {
                    setSelected(day.dateString);
                }}
                markedDates={{
                    '2024-03-10': {selected: true, marked: false, selectedColor: '#FF6961'},
                    '2024-03-11': {selected: true, marked: false, selectedColor: '#FAC898'},
                    '2024-03-12': {selected: true, marked: false, selectedColor: '#FDFD96'},
                    '2024-03-13': {selected: true, marked: false, selectedColor: '#77DD77'},
                    '2024-03-14': {selected: true, marked: false, selectedColor: '#A5D7F5'},
                    '2024-03-15': {selected: true, marked: false, selectedColor: '#8974D0'},
                    '2024-03-16': {selected: true, marked: false, selectedColor: '#C3B1E1'}
                }}
            />
            <Pressable
                style={styles.button}
                onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>back</Text>
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF3DA',
        alignItems: 'center',
        gap: 8,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: "#A3F7FF",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 7,
        borderColor: "#94CFF0",
        borderWidth: 2,
        height: 43
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 25
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black"
    },
    backButtonText: {
        fontSize: 15,
        color: 'black'
    }
});