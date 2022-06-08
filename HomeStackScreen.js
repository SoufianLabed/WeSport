import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Login from './src/Screen/Login'

const HomeStack = createStackNavigator()


function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name='Login' component={Login} />
        </HomeStack.Navigator>

    )
}

export default HomeStackScreen
