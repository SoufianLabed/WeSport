import { useContext,useState } from 'react';
import { Button, StyleSheet, Text, View,Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import tailwind from 'tailwind-rn';
import AppContext from '../context/AppContext'


const Map = ({navigation}) =>{
  const [text, setText] = useState('')
  const {counter, setCounter} = useContext(AppContext)
  return (
    <View style={styles.container}>
      <Text>MAP SCREEN</Text>
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
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });
  
export default Map;
