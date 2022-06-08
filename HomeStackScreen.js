import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Login from './src/Screen/Login';
import SwiperStarter from './src/Screen/SwiperStarter';

const HomeStack = createStackNavigator()


function HomeStackScreen() {
    return (
        <HomeStack.Navigator style="header: { visible: false }">
            <HomeStack.Screen name='Login' component={Login} />
            <HomeStack.Screen name='SwiperStarter' component={SwiperStarter} />
        </HomeStack.Navigator>
    )
}

export default HomeStackScreen
