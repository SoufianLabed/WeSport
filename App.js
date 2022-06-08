import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeStackScreen from './HomeStackScreen';



const Stack = createStackNavigator();
const App = () =>(
  <NavigationContainer>
    <HomeStackScreen/>
  </NavigationContainer>
)

export default App;