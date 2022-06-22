import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Profile from "../src/Screen/Profile";
import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

function Feed() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Feed!</Text>
        </View>
    );
}

function Profile() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Profile!</Text>
        </View>
    );
}

function Notifications() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Notifications!</Text>
        </View>
    );
}

const CustomButton = ({children, onPress}) => (
    <TouchableOpacity
        style={{
            top: 0,
            justifyContent: 'center',
            alignItems: 'center',
        }}
        onPress={onPress}
    >
        <View style={{
            width : 53,
            height : 53,
        }}>
            {children}
        </View>
    </TouchableOpacity>
);

const Tab = createBottomTabNavigator();

function BottomNavigation () {
    return (
        <Tab.Navigator
            initialRouteName="New Activity"
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#F5F9FA',
                    height: 87,
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                tabBarActiveTintColor : '#091833',
                tabBarInactiveTintColor : '#3C5BAA',


            }}
            // initialRouteName="Feed"<
            // activeColor="#091833"
            // inactiveColor="#3C5BAA"
            // barStyle={{ }}
            // labeled = {false}
        >
            <Tab.Screen
                name="Home"
                component={Feed}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Messages"
                component={Notifications}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="message" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="New Activity"
                component={Profile}
                options={{
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="plus-circle" color='#091833' size={53}/>
                    ),
                    tabBarButton : (props) => (
                        <CustomButton {...props} />
                    )
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={26} />
                    ),
                    tabBarBadge: 3, //rendre le nombre de notif en mode dynamique
                    tabBarBadgeStyle: {top : 20}
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default BottomNavigation;