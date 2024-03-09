import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Slider from '@react-native-community/slider';

export default function App() {
  // const[sliderMood, setSliderMood] = useState(0);

  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <StatusBar style="auto" />
      <Slider 
        style = {{width: 300, height: 40}} 
        minimumValue = {0} 
        maximumValue = {100}
        minimumTrackTintColor = "#FF482B"
        maximumTrackTintColor = "#2B5BFF"
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    flex: 1,
    padding: 20
  }
});
