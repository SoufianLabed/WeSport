import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Login from './src/Screen/Login';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Map from './src/Screen/Map'

import Home from './src/Screen/Home';

import CreateMeeting from './src/Screen/CreateMeeting';
import RequestMeeting from './src/Screen/RequestMeeting';
import Meetings from './src/Screen/Meetings';
import Profile from './src/Screen/Profile'

import BottomNavigation from './styles/BottomNavigation'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();


function StackScreen() {
    return (
       <BottomNavigation/>
    )
}

export default StackScreen
