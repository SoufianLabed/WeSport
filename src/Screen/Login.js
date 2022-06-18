import React, { useContext,Component,useState,useReducer } from "react";
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

import reducer from "../reducer/reducer";
import { UserContext } from '../context/AppContextLogin';
import tailwind from "tailwind-rn";
  
const Login =  ({ navigation: { navigate } }) =>  {

    
    //const [text, setText] = useState('')
    //const {userLogged, setUserLogged} = useContext(AppContext)

    const {userContext, setUserContext} = useContext(UserContext)


    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_TextInputChange: false,
        secureTextEntry: true,
    })


    const initialState = {count: 0};

    
    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        })
    }

    const eyePressed = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const textInputChange = (val) => {
        if (val.length != 0) {
            setData({
                ...data,
                email: val,
                check_TextInputChange: true
            })
        } else {
            setData({
                ...data,
                email: val,
                check_TextInputChange: false
            })
        }
    }

    const  onSignIn = async (username , password) => {
        const Auth = AuthService.login(username, password).then(
            async (response) => {
                try{
                    setUserContext(response.data)
                    await AsyncStorage.setItem("user", JSON.stringify(response.data));
                  }catch(e){
                    console.log(e)
                  }
                  return response;
            },
            error => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
            }
          
          );


    }

    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <Image
                style={styles.logoHK}
                source={require('../../assets/wesport.jpg')}/>
            <Text style={tailwind('text-center pt-10 text-xl font-bold')}>Connexion</Text>
        </View>
        <View style={styles.footer}>
            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
              
                <TextInput
                    placeholder="Your Email"
                    style={styles.textInput}
                    autoCapitalize='none'
                    onChangeText={(val) => textInputChange(val)}
                />
                {data.check_TextInputChange ?
                    <Feather
                        name='check-circle'
                        color='green'
                        size={20} />
                    : null}
            </View>
            <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
            <View style={styles.action}>
             
                <TextInput
                    placeholder="Your Password"
                    style={styles.textInput}
                    autoCapitalize='none'
                    secureTextEntry={data.secureTextEntry}
                    onChangeText={(val) => handlePasswordChange(val)} />
                <Feather
                    name='eye-off'
                    color='grey'
                    size={20}
                    onPress={() => eyePressed()}
                />
            </View>
            <Button title='Sign In' onPress={() => {onSignIn(data.email,data.password)}} />
            <Button title='Sign Up' onPress={() => navigate('Register')} />
            <Button title='TEST' style={{width:'10'}}/>
            
        </View>
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

  export default Login;