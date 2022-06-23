import React, {Component, useContext, useRef} from "react";
import Feather from 'react-native-vector-icons/Feather';
import AuthService from "../services/auth.service";
import {
    View,
    Text,
    TextInput,
    Platform,
    StyleSheet,
    Image,
    Button, Pressable
} from 'react-native';

import AppContext from '../context/AppContext'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";


const Profile = ({ navigation: { navigate } }) => {

    const inputRef = useRef();
    const {userLogged, setUserLogged} = useContext(AppContext)
    const [data, setData] = React.useState({
        email: '',
        password: '',
        username:'',
        check_TextInputChange: false,
        secureTextEntry: true
    })

    const [input, setInput] = React.useState({
        editable: false,
        selectTextOnFocus : false
    })

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
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

    const activModify = () => {
        setInput({
            ...input,
            editable: !input.editable,
            selectTextOnFocus : !input.selectTextOnFocus
        })
        // setRef(current.focus())
        // inputRef?.current?.focus()
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


    return (
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            style={{ backgroundColor: '#F5F9FA' }}
            scrollEnabled={true}>
            <View style={styles.container}>
                <View style={styles.header}>
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
                        <Feather
                            style={styles.iconInput}
                            name='edit-2'
                            color='#3C5BAA'
                            size={20}
                            onPress={() => activModify()}
                        />
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
                        <Feather
                            style={styles.iconInput}
                            name='edit-2'
                            color='#3C5BAA'
                            size={20}
                            onPress={() => activModify()}
                        />
                    </View>


                    <Text style={styles.text_footer}>Password</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="Your password"
                            style={styles.textInput}
                            autoCapitalize='none'
                            secureTextEntry={data.secureTextEntry}
                            // editable={input.editable}
                            selectTextOnFocus={input.selectTextOnFocus}
                            ref={inputRef}
                            autoFocus={false}
                            onChangeText={(val) => handlePasswordChange(val)} />
                        <Feather
                            style={[{marginRight : 30 }, styles.iconInput]}
                            name='eye-off'
                            color='grey'
                            size={18}
                            onPress={() => updateSecureTextEntry()}
                        />
                        <Feather
                            style={styles.iconInput}
                            name='edit-2'
                            color='#3C5BAA'
                            size={20}
                            onPress={() => activModify()}
                        />
                    </View>
                    <Pressable style={styles.button} >
                        <Text style={styles.buttonText}>Sauvegarder</Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAwareScrollView>

    );
}
export default Profile;


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
        right : -5,
        padding: 15
    }
})