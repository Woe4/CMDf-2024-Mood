import React, {useContext, useEffect, useState} from 'react';
import {Button, Pressable, StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Calendar} from 'react-native-calendars';
import {gql, useQuery} from '@apollo/client';
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
    const userContext = useContext(UserContext);
    // const { loading, error, data } = useQuery(GET_USER, {
    //   variables: { "email": "jen@jen.com" }
    // });
    // if (loading) return <Text>Loading...</Text>;
    // if (error) return <Text>Error! ${error.message} oof</Text>;

    return (
        <View style={styles.container}>
            <View
                style={{
                    justifyContent: 'center',
                    borderWidth: 3,
                    borderRadius: 4,
                    borderColor: '#FFD3A5',
                    marginBottom: 35
                }}>
                <Text
                    style={{
                        fontSize: 30,
                        paddingHorizontal: 15,
                        paddingVertical: 5,
                        fontWeight: 'bold',
                        color: "#D38432"
                    }}>Welcome, {userContext.name}!</Text>
            </View>
            <Button title="Statistics" onPress={() => navigation.navigate("history")} color={"#FFD3A5"}/>
            {/* <Pressable
                style={styles.button}
                onPress={() => navigation.navigate("stats")}>
                <Text>Statistics</Text>
            </Pressable> */}
        </View>
    )
}


function StatsScreen({navigation}) {

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-around',
            }}>
            <Text>stats</Text>
            <Pressable
                style={styles.button}
                onPress={() => navigation.navigate("history")}>
                <Text>history</Text>
            </Pressable>
            <Pressable
                style={styles.button}
                onPress={() => navigation.goBack()}>
                <Text>back</Text>
            </Pressable>
        </View>
    )
}


function HistoryScreen({navigation}) {
    const GET_USER_MOODS = gql`
      query getUserData($email: String!) {
        userByEmail(email: $email) {
          moods {
            edges {
              node {
                positivity
                date
              }
            }
          }
        }
      }
      `;

    const [selected, setSelected] = useState('');
    const user = useContext(UserContext);
    const {loading: moodsLoading, error: moodsError, data: moodsData} = useQuery(GET_USER_MOODS, {
        variables: {email: user.email ?? ""}
    });
    const [moods, setMoods] = useState({
        '2024-03-03': {selected: true, marked: false, selectedColor: '#FF6961'},
        '2024-03-04': {selected: true, marked: false, selectedColor: '#FAC898'},
        '2024-03-05': {selected: true, marked: false, selectedColor: '#FDFD96'},
        '2024-03-06': {selected: true, marked: false, selectedColor: '#77DD77'},
        '2024-03-07': {selected: true, marked: false, selectedColor: '#A5D7F5'},
        '2024-03-08': {selected: true, marked: false, selectedColor: '#8974D0'},
        '2024-03-09': {selected: true, marked: false, selectedColor: '#C3B1E1'}
    });

    useEffect(() => {
        function processMoods() {
            if (moodsData && moodsData.userByEmail && moodsData.userByEmail.moods) {
                try {
                    const allMoods = moodsData.userByEmail.moods.edges;
                    // Accumulate changes in a temporary object
                    const newMoodsObj = {};
                    allMoods.forEach((e) => {
                        const color = numberToColor(e.node.positivity).toUpperCase();
                        const date = e.node.date.split("T")[0];
                        newMoodsObj[date] = {
                            selected: true,
                            marked: false,
                            selectedColor: color
                        };
                    });
                    // Update the state once after all changes are accumulated
                    setMoods(prevMoods => ({
                        ...prevMoods,
                        ...newMoodsObj
                    }));
                } catch (error) {
                    console.error("Error processing moods:", error);
                }
            }
        }

        processMoods();
    }, [moodsData]);


    function numberToColor(number) {
        // Ensure the number is within the range of 0 to 100
        const clampedNumber = Math.min(Math.max(number, 0), 100);

        // Define the two colors
        const color1 = [255, 105, 97]; // #FF6961
        const color2 = [195, 177, 225]; // #C3B1E1

        // Interpolate between the two colors
        const r = Math.round(color1[0] + (color2[0] - color1[0]) * (clampedNumber / 100));
        const g = Math.round(color1[1] + (color2[1] - color1[1]) * (clampedNumber / 100));
        const b = Math.round(color1[2] + (color2[2] - color1[2]) * (clampedNumber / 100));

        // Convert to hexadecimal format
        const hexR = r.toString(16).padStart(2, '0');
        const hexG = g.toString(16).padStart(2, '0');
        const hexB = b.toString(16).padStart(2, '0');

        return `#${hexR}${hexG}${hexB}`;
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#FFF3DA',
                alignItems: 'center',
                justifyContent: 'space-evenly',
            }}>
            <View
                style={{
                    justifyContent: 'center',
                    borderWidth: 3,
                    borderRadius: 4,
                    borderColor: '#FFD3A5',
                }}>
                <Text
                    style={{
                        fontSize: 30,
                        paddingHorizontal: 15,
                        paddingVertical: 5,
                        fontWeight: 'bold',
                        color: "#D38432"
                    }}>HISTORY</Text>
            </View>

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
                markedDates={moods}
            />
            <Button
                title={"Back"}
                onPress={() => navigation.goBack()}
                color={"#FFD3A5"}
            />
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
        backgroundColor: "#FF5733",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 12
    }
});