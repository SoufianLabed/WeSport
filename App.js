import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import 'react-native-gesture-handler';
<<<<<<< HEAD
import Login from "./src/Screen/Login"
import RootStackScreen from './RootStackScreen';
import StackScreen from './HomeStackScreen';
=======
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeStackScreen from './HomeStackScreen';

>>>>>>> ef1091cc8e80f63870d68574543ce3fbf735e3de

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () =>(
  <NavigationContainer>
    <StackScreen/>
  </NavigationContainer>
)

export default App;