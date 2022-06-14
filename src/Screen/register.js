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
    Button
} from 'react-native';

import AppContext from '../context/AppContext'

const Register = ({ navigation: { navigate } }) => {

    /*
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }*/
  
  const {userLogged, setUserLogged} = useContext(AppContext)
  const [data, setData] = React.useState({
    email: '',
    password: '',
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

const onSignUp = (email , password) => {
    console.log(email , password);
   
    AuthService.register(
        data.username,
        data.email,
        data.password
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
        <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.text_header}>
                Welcome !
                </Text>
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
                        onPress={() => updateSecureTextEntry()}
                    />
            </View>
            <Text style={[styles.text_footer, { marginTop: 35 }]}>Confirm Password</Text>
            <View style={styles.action}>

                <TextInput
                    placeholder="Your Password"
                    style={styles.textInput}
                    autoCapitalize='none'
                    secureTextEntry={data.ConfirmSecureTextEntry}
                    onChangeText={(val) => handleConfirmPasswordChange(val)} />
                <Feather
                        name='eye-off'
                        color='grey'
                        size={20}
                        onPress={() => updateSecureTextEntry()}
                    />
            </View>
            {data.password !== data.confirm_password ?
                <Text style={styles.text_error} > The passwords have to be the same</Text>
                : null}
            <Button title='Sign In' onPress={() => navigation.navigate('Login')} />
            <Button title='Sign Up' onPress={() => onSignUp(data.email,data.password)}/>
        </View>
    </View>
    );
  }
  export default Register;


  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
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
        top: 40,
        left: '11%',
        height: 200,
        width: 300,
    },
    text_error: {
        color: '#FF0000'
    }
})