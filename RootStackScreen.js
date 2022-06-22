import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import 'react-native-gesture-handler';
import Login from "./src/Screen/Login";
import Register from './src/Screen/Register';
import AuthService from "./src/services/auth.service";
import SwiperStarter from './src/Screen/SwiperStarter';
import Home from './src/Screen/Home';
import { useState, useEffect,useContext,useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppProvider } from './src/context/AppContext';
import AppContext from "./src/context/AppContext";
import Map from './src/Screen/Map';
import CreateMeeting from './src/Screen/CreateMeeting';
import { UserContext } from './src/context/AppContextLogin';
import StackScreen from './HomeStackScreen';
<<<<<<< HEAD
import LoadingHome from "./src/Screen/LoadingHome";
=======
import Profile from "./src/Screen/Profile";
import BottomNavigation from "./styles/BottomNavigation";

>>>>>>> d272cdc (add profile screen and bottom menu)



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const RootStackScreen = (props) =>{

  //const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  //const [showAdminBoard, setShowAdminBoard] = useState(false);


 //const {userLogged, setUserLogged} = useContext(AppContext)

 const {userContext, setUserContext} = useContext(UserContext)
 
  const initialState = {count: 0};
  const [currentUser, setCurrentUser] = useState(undefined);


  useEffect(() => {
  }, [userContext]);


  const logOut = () => {
    AuthService.logout();
  };


  return userContext ? (
    <AppProvider>
      <NavigationContainer>
        <StackScreen/>
      </NavigationContainer>
    </AppProvider>

  ) : 
  (
    <AppProvider>
      <NavigationContainer>
<<<<<<< HEAD
        <Stack.Navigator initialRouteName="Login"  screenOptions={{headerShown: false }}>
          <Stack.Screen name="Swiper" component={SwiperStarter} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
=======
        <Stack.Navigator initialRouteName="Profile">
        {/*  /!*<Stack.Screen name="Register" component={Register} />*!/*/}
        {/*  /!*<Stack.Screen name="Login" component={Login} />*!/*/}
          <Stack.Screen name="Profile" component={Profile} />
>>>>>>> d272cdc (add profile screen and bottom menu)
        </Stack.Navigator>
        {/*<Stack.Navigator initialRouteName="LoadingHome">*/}
        {/*  <Stack.Screen name="LoadingHome" component={LoadingHome} />*/}
        {/*  /!*<Stack.Screen name="Register" component={Register} />*!/*/}
        {/*  /!*<Stack.Screen name="Login" component={Login} />*!/*/}
        {/*</Stack.Navigator>*/}
    </NavigationContainer>
    </AppProvider>
  )
}

export default RootStackScreen;

/**
 * 
 * 
 *      <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="SwiperStarter" component={SwiperStarter} />
        </Stack.Navigator>
      </NavigationContainer>
 * 
 */












/*
import React from 'react'

import {createStackNavigator} from '@react-navigation/stack'

import Login from './src/Screen/Login';


const RootStack = createStackNavigator()

function RootStackScreen({navigation}) {
    return (
        
        <RootStack.Navigator>
            <RootStack.Screen name='Login' component={Login}/>
        </RootStack.Navigator>
    )
}

export default RootStackScreen
*/