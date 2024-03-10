import ImageButton from './components/ImageButton';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';

export default function SentimentScreen({ route }) {
    const mood = route.params;

    function setMoodString() {
      if (0 <= moodNumber < 33) {
        return "first";
      } else if (33 <= moodNumber <= 66) {
        return "second";
      } else {
        return "third"
      }
    }

    return (
    <View style={styles.container}>
      <Text style={styles.text}>sentiment?</Text>
      <ImageButton
        onPress={() => console.log("button as component")}
        imageStyle={styles.image}
        source={require("../assets/icon.png")}
        text={setMoodString()}
        />
      <ImageButton
        onPress={() => console.log("button as component")}
        imageStyle={styles.image}
        source={require("../assets/icon.png")}
        text={setMoodString()}
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