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
