import React, {useContext, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {Button, ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import Slider from '@react-native-community/slider';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {gql, useMutation} from "@apollo/client";
import {UserContext} from "./App";

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
            <View
                style={{
                    justifyContent: 'center',
                    borderWidth: 3,
                    borderRadius: 4,
                    borderColor: '#FFD3A5',
                }}>
                <Text
                    style={{
                        fontSize: 20,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        fontWeight: 'bold',
                        color: "#D38432"
                    }}>Log your mood</Text>
            </View>
            <Slider
                style={{width: 300, height: 40}}
                minimumValue={0}
                maximumValue={100}
                onValueChange={handleSlideComplete}
                minimumTrackTintColor="#E59948"
                maximumTrackTintColor="#D38432"
                thumbTintColor='#C4711A'
            />
            <Button
                title={"Next"}
                onPress={() => navigation.navigate("sentiment", {mood: sliderMood})}
                color={"#FFD3A5"}
            />
            <StatusBar style="auto"/>
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
            <View
                style={{
                    justifyContent: 'center',
                    borderWidth: 3,
                    borderRadius: 4,
                    borderColor: '#FFD3A5',
                }}>
                <Text
                    style={{
                        fontSize: 20,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        fontWeight: 'bold',
                        color: "#D38432"
                    }}>Which sentiment resonates with you?</Text>
            </View>
            <Pressable
                onPress={() => navigation.navigate("summary", {choice: 0})}
                style={{alignItems: 'center'}}>
                <ImageBackground source={require("./assets/bubble.png")} style={styles.image}>
                    <Text>{moodStringAGlobal}</Text>
                </ImageBackground>
            </Pressable>

            <Pressable
                onPress={() => navigation.navigate("summary", {choice: 1})}
                style={{alignItems: 'center'}}>
                <ImageBackground source={require("./assets/bubble.png")} style={styles.image}>
                    <Text>{moodStringBGlobal}</Text>
                </ImageBackground>
            </Pressable>

            <Button
                title={"Back"}
                onPress={() => navigation.goBack()}
                color={"#FFD3A5"}
            />
            <StatusBar style="auto"/>
        </View>
    );
}

function SummaryScreen({route, navigation}) {
    const {choice} = route.params;
    const choiceValue = Object.values({choice})[0];

    const ADD_MOOD = gql`
    mutation UpdateMood(
    $email: String!,
    $positivity: Int!,
    $sentiment: String!,
    $sentimentword: String!,
    $date: DateTime!,
    $submitted: Boolean!                
) {
    updateMood(moodData: {
        email: $email,
        positivity: $positivity,
        sentiment: $sentiment,
        sentimentword: $sentimentword,
        date: $date,
        submitted: $submitted }
    ) {
    user {
      name
      moods {
        edges {
          node {
            date
            sentiment
          }
        }
      }
    }
    }
}
`

    const [addMood] = useMutation(ADD_MOOD);
    const user = useContext(UserContext);

    function handleFinish() {
        let moodSentiment = "";
        if (sliderMoodGlobal < 33) {
            moodSentiment = "NEGATIVE";
        } else if (sliderMoodGlobal < 66) {
            moodSentiment = "NEUTRAL";
        } else {
            moodSentiment = "POSITIVE";
        }
        addMood({
            variables: {
                email: user.email,
                positivity: sliderMoodGlobal,
                sentiment: moodSentiment,
                sentimentword: moodString,
                date: formatDateTimeNow(),
                submitted: true
            }
        });
        navigation.navigate("home");
    }

    function formatDateTimeNow() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }

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
            <View
                style={{
                    justifyContent: 'center',
                    borderWidth: 3,
                    borderRadius: 4,
                    borderColor: '#FFD3A5',
                }}>
                <Text
                    style={{
                        fontSize: 25,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        fontWeight: 'bold',
                        color: "#D38432"
                    }}>Daily Summary</Text>
            </View>
            <Text style={
                {
                    fontSize: 25,
                    fontWeight: 'bold',
                }
            }>{moodString}</Text>
            <Slider
                style={{width: 300, height: 40}}
                minimumValue={0}
                maximumValue={100}
                value={sliderMoodGlobal}
                disabled={true}
                minimumTrackTintColor="#E59948"
                maximumTrackTintColor="#D38432"
                thumbTintColor='#C4711A'
            />
            <View style={{flexDirection: 'row', gap: 50}}>
                <Button
                    title={"finish"}
                    onPress={handleFinish}
                    color={"#FFD3A5"}
                />
                <Button
                    title={"edit"}
                    onPress={() => navigation.goBack()}
                    color={"#D3A432"}
                />
            </View>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF3DA',
        alignItems: 'center',
        gap: 8,
        justifyContent: 'space-evenly',
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
        backgroundColor: '#FFF3DA',
        alignItems: 'center',
        gap: 4,
        justifyContent: 'space-around',
    },
    image: {
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sentiment_text: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});