import React, { useContext,Component,useState } from "react";
import  AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from "../services/auth.service";
import Feather from 'react-native-vector-icons/Feather';
import {
    View,
    Text,
    TextInput,
    Platform,
    StyleSheet,
    Image,
    Button
} from 'react-native';

import AppContext from "../context/AppContext";

import { UserContext } from '../context/AppContextLogin';
import tailwind from "tailwind-rn";
  
const Meetings =  ({ navigation: { navigate } }) =>  {

    const Meetings = async () =>{
        
    }

    return (
        <View style={styles.container}>
        
        </View>
    );
  }

  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: '#05375a',
    },
    logoHK: {
        top: 100,
        left: '11%',
        height: 200,
        width: 300,
    }
})

  export default Meetings;