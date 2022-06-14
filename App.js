import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import 'react-native-gesture-handler';

import Login from "./src/Screen/login";
import Register from './src/Screen/register';
import AuthService from "./src/services/auth.service";

import SwiperStarter from './src/Screen/SwiperStarter';
import Home from './src/Screen/home';
import RootStackScreen from './RootStackScreen';
import { useState, useEffect,useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AppProvider } from './src/context/AppContext';

import AppContext from "./src/context/AppContext";




const App = (props) =>{
  //const token = JSON.parse(localStorage.getItem("user")).accessToken;
  //console.log(token.length > 0)

  return (
    <AppProvider>
        <RootStackScreen/>
    </AppProvider>
    
  ) 
}

export default App;

/**
 * 
 */