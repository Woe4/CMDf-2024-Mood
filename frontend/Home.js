import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, FlatList} from 'react-native';
import Slider from '@react-native-community/slider';
import ImageButton from './components/ImageButton';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Calendar, LocaleConfig} from 'react-native-calendars';




const Stack = createNativeStackNavigator();

export default function HomeScreenStack() {

    return (
        <Stack.Navigator
            screenOptions = {{headerShown: false}}
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


function HomeScreen({ navigation }) {

    return (
        <View
            style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
            <Text>welcome!</Text>
            <Pressable
            style = {styles.button}
            onPress={() => navigation.navigate("stats")}>
            <Text>stats</Text>
        </Pressable>
        </View>
    )
}


function StatsScreen({ navigation }) {

    return (
        <View
            style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
            <Text>stats</Text>
            <Pressable
            style = {styles.button}
            onPress={() => navigation.navigate("history")}>
            <Text>history</Text>
            </Pressable>
            <Pressable
            style = {styles.button}
            onPress={() => navigation.goBack()}>
            <Text>back</Text>
        </Pressable>
        </View>
    )
}


function HistoryScreen({ navigation }) {
  const [selected, setSelected] = useState('');

    return (
        <View
            style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
            <Text>history</Text>

        {/* <FlatList
        data={[
          {key: 'mango'}
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      /> */}
        <Calendar
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
            style = {styles.button}
            onPress={() => navigation.goBack()}>
            <Text>back</Text>
        </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EDF5AF',
      alignItems: 'center',
      gap: 8,
      justifyContent: 'center',
    },
    slider: {
      flex: 1,
      padding: 20
    },
    button: {
      backgroundColor: "#FF5733",
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 12
    },
    text: {
      color: "white",
    },
    sentiment_container: {
        flex: 1,
        backgroundColor: '#C5E5FF',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        justifyContent: 'space-around',
    },
    image: {
        width: 100,
        height: 100
    },
    sentiment_text: {
        fontSize: 20,
        fontWeight: 'bold',
      }
  });