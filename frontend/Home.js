import React, {useContext, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { gql, useMutation, useQuery } from '@apollo/client';

const GET_USER = gql`
  query getUserData($email: String!) {
    userByEmail(email: $email) {
      name
      email
    }
  }
  `;

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


function HomeScreen({ navigation }) {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { "email": "jen@jen.com" }
  });
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error! ${error.message} oof</Text>;

  return (
      <View
          style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
          <Text>Welcome {data.userByEmail.name}!</Text>
          <Text></Text>
          <Pressable
          style = {styles.button}
          onPress={() => navigation.navigate("stats")}>
          <Text>stats</Text>
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


function HistoryScreen({navigation}) {
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
    button: {
        backgroundColor: "#FF5733",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 12
    }
});