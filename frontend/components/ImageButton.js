import {ImageBackground, Pressable, Text, StyleSheet} from 'react-native';

export default function ImageButton({ onPress, source, imageStyle, text}) {
  return (
    <Pressable 
    onPress = {onPress}
    style = { ( { pressed } ) => {
      return {opacity: pressed ? 0.5 : 1}
    }}> 
    <ImageBackground source={source} resizeMode="cover" style={imageStyle}>
      <Text style = {styles.text}>  {text} </Text>
    </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});