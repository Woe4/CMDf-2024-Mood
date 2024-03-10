import React, {useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {Button, Pressable, StyleSheet, Text, View} from 'react-native';
import Slider from '@react-native-community/slider';
import ImageButton from './components/ImageButton';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
var sliderMoodGlobal;
var moodStringAGlobal;
var moodStringBGlobal;


export default function LogMoodStack() {

    return (
        <Stack.Navigator
            screenOptions={{headerShown: false}}>
            <Stack.Screen
                name="log mood"
                component={LogMoodScreen}
            />
            <Stack.Screen
                name="sentiment"
                component={SentimentScreen}
            />
            <Stack.Screen
                name="summary"
                component={SummaryScreen}
            />
        </Stack.Navigator>
    )
}

function LogMoodScreen({navigation}) {
    const [sliderMood, setSliderMood] = useState(0);
    sliderMoodGlobal = sliderMood;
    console.log(sliderMoodGlobal)

    const handleSlideComplete = (endValue) => {
        setSliderMood(Math.round(endValue));

        console.log("slidermood: " + sliderMood);
    };

    return (
        <View style={styles.container}>
            <Text>log your mood</Text>
            <StatusBar style="auto"/>
            <Slider
                style={{width: 300, height: 40}}
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor="#966FD6"
                maximumTrackTintColor="#FFFFFF"
                onValueChange={handleSlideComplete}
            />
            <Pressable
                style={styles.button}
                onPress={() => navigation.navigate("sentiment", {mood: sliderMood})}>
                <Text>confirm</Text>
            </Pressable>
        </View>
    );
}

function SentimentScreen({navigation, route}) {
    const {mood} = route.params;
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

    moodStringAGlobal = getMoodStringA();
    moodStringBGlobal = getMoodStringB();

    return (
        <View style={styles.sentiment_container}>
            <Text style={styles.sentiment_text}>sentiment?</Text>
            <ImageButton
                onPress={() => navigation.navigate("summary", {choice: 0})}
                imageStyle={styles.image}
                source={require("./assets/icon.png")}
                text={moodStringAGlobal}
            />
            <ImageButton
                onPress={() => navigation.navigate("summary", {choice: 1})}
                imageStyle={styles.image}
                source={require("./assets/icon.png")}
                text={moodStringBGlobal}
            />
            <Pressable
                style={styles.button}
                onPress={() => navigation.goBack()}>
                <Text>back</Text>
            </Pressable>
            <StatusBar style="auto"/>
        </View>
    );
}

function SummaryScreen({route, navigation}) {
    const {choice} = route.params;
    const choiceValue = Object.values({choice})[0];

    function getMoodString() {
        if (choiceValue === 0) {
            return moodStringAGlobal;
        } else {
            return moodStringBGlobal;
        }
    }

    console.log(choiceValue);
    console.log(choice);
    let moodString = getMoodString();

    return (
        <View style={styles.container}>
            <Text style={styles.sentiment_text}>summary</Text>
            <Text style={styles.sentiment_text}>{moodString}</Text>
            <Slider
                style={{width: 300, height: 40}}
                minimumValue={0}
                maximumValue={100}
                value={sliderMoodGlobal}
                disabled={true}
                minimumTrackTintColor="#966FD6"
                maximumTrackTintColor="#FFFFFF"
            />
            <Button title="finish" onPress={() => navigation.navigate("home")}/>
            <Pressable
                style={styles.button}
                onPress={() => navigation.goBack()}>
                <Text>back</Text>
            </Pressable>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C5E5FF',
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