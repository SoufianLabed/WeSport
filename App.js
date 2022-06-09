import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import 'react-native-gesture-handler';
import Login from "./src/Screen/Login";
import SwiperStarter from './src/Screen/SwiperStarter';

import RootStackScreen from './RootStackScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/Screen/Home';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () =>(
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SwiperStarter" component={SwiperStarter} />
      </Stack.Navigator>
  </NavigationContainer>
)

export default App;