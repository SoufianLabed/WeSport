import React, { Component, useContext } from "react";
import Feather from 'react-native-vector-icons/Feather';
import AuthService from "../services/auth.service";
import {
    View,
    Text,
    TextInput,
    Platform,
    StyleSheet,
    Image,

    Button,
    Pressable
} from 'react-native';

import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import AppContext from '../context/AppContext'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const Register = ({ navigation: { navigate } }) => {
  
  const {userLogged, setUserLogged} = useContext(AppContext)
  const [data, setData] = React.useState({
    email: '',
    password: '',
    username:'',
    confirm_password: "",
    check_TextInputChange: false,
    secureTextEntry: true,
    ConfirmSecureTextEntry: true
})      

const handlePasswordChange = (val) => {
    setData({
        ...data,
        password: val
    })
}
const handleConfirmPasswordChange = (val) => {
    setData({
        ...data,
        confirm_password: val
    })
}

const handleUsernameChange = (val) => {
    setData({
        ...data,
        username: val
    })
}

const updateSecureTextEntry = () => {
    setData({
        ...data,
        secureTextEntry: !data.secureTextEntry
    })
}

const updateConfirmSecureTextEntry = () => {
    setData({
        ...data,
        ConfirmSecureTextEntry: !data.ConfirmSecureTextEntry
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

const onSignUp = (email , password,username) => {
    console.log("Register",email , password,username);
   
    AuthService.register(
        username,
        email,
        password
      ).then(
        response => {
          
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
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            style={{ backgroundColor: '#F5F9FA' }}
            scrollEnabled={true}>
            <View style={styles.container}>
                <View style={styles.header}>
                    {/*<Text style={styles.text_header}>*/}
                    {/*    Welcome !*/}
                    {/*    </Text>*/}
                    <Image style={styles.profilPicture}>

                    </Image>
                    <Pressable style={styles.cameraButton}>
                        <Feather
                            name='camera'
                            color='white'
                            size={20}
                        />
                    </Pressable>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.text_footer}>Prénom - Nom</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Ex : Rafael David "
                            style={styles.textInput}
                            autoCapitalize='none'
                            onChangeText={(val) => textInputChange(val)}
                        />
                        {data.check_TextInputChange ?
                             <Feather
                                 style={styles.iconInput}
                                 name='check-circle'
                                 color='green'
                                 size={20} />
                            : null}
                    </View>
                    <Text style={styles.text_footer}>Numéro de téléphone</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Ex : 06 66 82 97 85"
                            style={styles.textInput}
                            autoCapitalize='none'
                            onChangeText={(val) => handleUsernameChange(val)}
                        />
                        {data.check_TextInputChange ?
                             <Feather
                                 style={styles.iconInput}
                                 name='check-circle'
                                 color='green'
                                 size={20} />
                            : null}
                    </View>
                    <Text style={styles.text_footer}>Email</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Ex : rafael.david@gmail.com"
                            style={styles.textInput}
                            autoCapitalize='none'
                            onChangeText={(val) => handleUsernameChange(val)}
                        />
                        {data.check_TextInputChange ?
                            <Feather
                                style={styles.iconInput}
                                name='check-circle'
                                color='green'
                                size={20} />
                            : null}
                    </View>


                    <Text style={styles.text_footer}>Password</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Your password"
                            style={styles.textInput}
                            autoCapitalize='none'
                            secureTextEntry={data.secureTextEntry}
                            onChangeText={(val) => handlePasswordChange(val)} />
                            <Feather
                                style={styles.iconInput}
                                name='eye-off'
                                color='grey'
                                size={20}
                                onPress={() => updateSecureTextEntry()}
                            />
                    </View>
                    <Text style={styles.text_footer}>Confirm Password</Text>
                    <View style={styles.action}>

                        <TextInput
                            placeholder="Confirm your password"
                            style={styles.textInput}
                            autoCapitalize='none'
                            secureTextEntry={data.ConfirmSecureTextEntry}
                            onChangeText={(val) => handleConfirmPasswordChange(val)} />
                        <Feather
                            style={styles.iconInput}
                            name='eye-off'
                            color='grey'
                            size={18}
                            onPress={() => updateSecureTextEntry()}
                            />
                    </View>
                    {data.password !== data.confirm_password ?
                        <Text style={styles.text_error} > The passwords have to be the same</Text>
                        : null}
                    <Pressable style={styles.button} onPress={() => onSignUp(data.email,data.password,data.username)}>
                        <Text style={styles.buttonText}>Enregistre et continue</Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAwareScrollView>

    );
  }
  export default Register;


  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F9FA',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight : 36,
        paddingLeft : 36

    },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingBottom: 50,
        top: 44
    },
    profilPicture :{
        borderRadius: 1000,
        borderWidth : 1,
        borderColor :'#091833',
        width: 160,
        height: 160,

    },
    cameraButton: {
        position : 'absolute',
        backgroundColor : '#3C5BAA',
        top : 115,
        right : 25,
        height : 48,
        width : 48,
        borderRadius: 50,
        alignItems : 'center',
        justifyContent : 'center'
    },
    footer: {
        flex: 3,
        backgroundColor: '#F5F9FA',
        marginTop : 45,
        width: '90%',
        height : '60%'
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        fontWeight: "bold"
    },
    action: {
        flexDirection: 'row',
        marginTop: 17,
        paddingBottom: 35,
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: '#05375a',
        borderWidth : 1,
        height: 49,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderColor : '#3C5BAA',
    },
     button: {
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          backgroundColor: '#3C5BAA',
          height: 36,
          alignItems: 'center',
          justifyContent: 'center',
         marginBottom : 30
     },
     buttonText: {
          color: '#F6F9FA',
          fontWeight: 'bold',
          textAlign: 'center'
     },
    logoHK: {
        top: 40,
        left: '11%',
        height: 200,
        width: 300,
    },
    text_error: {
        color: '#FF0000'
    },
    iconInput : {
        position : 'absolute',
        right : 5,
        padding: 15
    }
})