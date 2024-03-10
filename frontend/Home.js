import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, FlatList} from 'react-native';
import Slider from '@react-native-community/slider';
import ImageButton from './components/ImageButton';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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

    return (
        <View
            style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
            <Text>history</Text>

            <FlatList
        data={[
          {key: 'hi'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'hi'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'hi'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'hi'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'hi'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'hi'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'hi'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'hi'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'hi'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'hi'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'hi'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'hi'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'hi'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'hi'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'hi'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'hi'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'hi'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'hi'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'hi'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'hi'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'hi'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'hi'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'hi'},
          {key: 'oh'},
          {key: 'my'},
          {key: 'oh'},
          {key: 'mango'}
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
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