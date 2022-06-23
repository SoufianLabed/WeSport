import React, { useContext, Component, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthService from "../services/auth.service";
import Feather from "react-native-vector-icons/Feather";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  View,
  Text,
  TextInput,
  Platform,
  StyleSheet,
  Image,
  Button,
  Pressable, 
  Linking
} from "react-native";

import AppContext from "../context/AppContext";

import { UserContext } from "../context/AppContextLogin";
import tailwind from "tailwind-rn";

const Login = ({ navigation: { navigate } }) => {
  //const [text, setText] = useState('')
  //const {userLogged, setUserLogged} = useContext(AppContext)

  const { userContext, setUserContext } = useContext(UserContext);

  const [data, setData] = React.useState({
    email: "",
    password: "",
    check_TextInputChange: false,
    secureTextEntry: true,
  });

  const initialState = { count: 0 };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const eyePressed = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const textInputChange = (val) => {
    if (val.length != 0) {
      setData({
        ...data,
        email: val,
        check_TextInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_TextInputChange: false,
      });
    }
  };

  const onSignIn = async (username, password) => {
    const Auth = AuthService.login(username, password).then(
      async (response) => {
        try {
          setUserContext(response.data);
          await AsyncStorage.setItem("user", JSON.stringify(response.data));
        } catch (e) {
          console.log(e);
        }
        return response;
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  };

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      style={{ backgroundColor: "#F5F9FA" }}
      scrollEnabled={true}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.logoHK}
            source={require("../../assets/wesport.jpg")}
          />
          <Text style={styles.txt}>
            Connexion
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
            />
            {data.check_TextInputChange ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : null}
          </View>
          <Text  style={styles.text_footer}>Password</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Mot de passe"
              style={styles.textInput}
              autoCapitalize="none"
              secureTextEntry={data.secureTextEntry}
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <Feather
              style={styles.iconInput}
              name="eye-off"
              color="grey"
              size={20}
              onPress={() => eyePressed()}
            />
          </View>

            <Pressable style={styles.button} onPress={() => {onSignIn(data.email,data.password)}}>
                <Text style={styles.buttonText}>Connexion</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigate("Register")}>
                <Text style={styles.buttonText}>Inscription</Text>
            </Pressable>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F9FA',
        alignItems: 'center',
        justifyContent: 'center',
        overflow : 'scroll',
        paddingRight : 36,
        paddingLeft : 36
    },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingBottom: 50,
        top: 77
    },
    txt: {
      fontWeight: "bold",
      fontFamily: "Roboto",
      alignItems: 'center',
      justifyContent: 'center',
      fontSize : 35,
      lineHeight:53,
      marginTop : 30,
      marginBottom: 50,
      color : '#091833'

    },
    footer: {
        flex: 3,
        paddingHorizontal: 20,
        paddingVertical: 30,
        width: '90%',
        top: 20
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
    logoHK: {
        // top: 77,
        height: 95,
        width: 300,
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
    mdpLink: {
        color: '#3C5BAA',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign : 'center',
        marginTop : 20
    },

    iconInput : {
       position : 'absolute',
       right : 5,
       padding: 15
    }

})

export default Login;
