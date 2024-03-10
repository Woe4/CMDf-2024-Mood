import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';
import ImageButton from './components/ImageButton';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function LogMoodStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen
            name="log mood"
            component={LogMoodScreen}
            />
            <Stack.Screen
            name="sentiment"
            component={SentimentScreen}
            />
        </Stack.Navigator>
    )
}

function LogMoodScreen({ navigation }) {
    const[sliderMood, setSliderMood] = useState(0);

    const handleSlideComplete = (endValue) => {
      setSliderMood(Math.round(endValue));
  
      console.log("slidermood: " + sliderMood);
    };

    return (
      <View style={styles.container}>
        <Text>log your mood</Text>
        <StatusBar style="auto" />
        <Slider 
          style = {{width: 300, height: 40}} 
          minimumValue = {0} 
          maximumValue = {100}
          minimumTrackTintColor = "#900C3F"
          maximumTrackTintColor = "#FFC300"
          onValueChange={handleSlideComplete}
          />
        <Pressable
          style = {styles.button}
          onPress={() => navigation.navigate("sentiment", {mood: sliderMood})}>
            <Text>confirm</Text>
        </Pressable>
      </View>
    );
  }

function SentimentScreen({ route }) {
    const { mood } = route.params;
    const moodNumber = Object.values({mood})[0];

    function getMoodStringA() {
        if (moodNumber < 33) {
            return "sad";
        } else if (moodNumber < 66) {
            return "okay";
        } else {
            return "happy"
        }
    }

function getMoodStringB() {
    if (moodNumber < 33) {
        return "angry";
    } else if (moodNumber < 66) {
        return "tired";
    } else {
        return "excited"
    }
    }

    console.log({mood})
    console.log(moodNumber)

    return (
    <View style={styles.sentiment_container}>
      <Text style={styles.sentiment_text}>sentiment?</Text>
      <ImageButton
        onPress={() => console.log(getMoodStringA())}
        imageStyle={styles.image}
        source={require("./assets/icon.png")}
        text={getMoodStringA()}
        />
      <ImageButton
        onPress={() => console.log(getMoodStringB())}
        imageStyle={styles.image}
        source={require("./assets/icon.png")}
        text={getMoodStringB()}
        />
      <StatusBar style="auto" />
    </View>
    );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EDF5AF',
      alignItems: 'center',
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