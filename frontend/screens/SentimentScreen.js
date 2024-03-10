import ImageButton from './components/ImageButton';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';

export default function SentimentScreen({ route }) {
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
    <View style={styles.container}>
      <Text style={styles.text}>sentiment?</Text>
      <ImageButton
        onPress={() => console.log(getMoodStringA())}
        imageStyle={styles.image}
        source={require("../assets/icon.png")}
        text={getMoodStringA()}
        />
      <ImageButton
        onPress={() => console.log(getMoodStringB())}
        imageStyle={styles.image}
        source={require("../assets/icon.png")}
        text={getMoodStringB()}
        />
      <StatusBar style="auto" />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
    text: {
      fontSize: 20,
      fontWeight: 'bold',
    }
  });