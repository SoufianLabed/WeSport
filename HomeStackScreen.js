import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Login from './src/Screen/Login'
import Test from './src/Screen/Test'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import SwiperStarter from './src/Screen/SwiperStarter'

import Message from './src/Screen/Message'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();


function StackScreen() {
    return (
        <Tab.Navigator 
          screenOptions={{
          tabBarStyle: {
            height: 90,
          },
          tabBarActiveTintColor: '#091833',
          tabBarInactiveColor: '#98AAD2',
    
        }} >
            <Tab.Screen name='Login' component={Login}  options={{    
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size}  color={color} > </Icon>
          )
        }}/>

        <Tab.Screen name="Message" component={Test} options={{ 
          inactiveColor:"red",   
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Icon name="comments" size={size} color={color}  ></Icon>
          ),
          
           }} />
            <Tab.Screen name="Map" component={Login} options={{    
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Icon name="plus" style={{textAlign:"center",alignItems:"center",backgroundColor:"#091833",padding: 25,marginBottom:15,borderRadius:100,color:"white"}} size={35} color={color} ></Icon>
          ),
          
        }} />

            <Tab.Screen name="Home" component={Login}  options={{    
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Icon name="bell" size={size}  color={color}></Icon>
          ),
          
        }}/>
            <Tab.Screen name="Settings" component={Message}  options={{    
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color}></Icon>
          ),
          
        }}/>   

            <Tab.Screen name='Swipper' component={SwiperStarter}  options={{    
              tabBarLabel: '',
              tabBarIcon: ({ color, size }) => (
                <Icon name="home" size={size}  color={color} > </Icon>
              )
            }}/>
        </Tab.Navigator>

    )
}

export default StackScreen
