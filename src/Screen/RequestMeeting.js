import React, { useContext,Component,useState,useEffect } from "react";
import  AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from "../services/auth.service";
import CollapsibleList from "react-native-collapsible-list";
import Feather from 'react-native-vector-icons/Feather';
import {
    View,
    Text,
    TextInput,
    Platform,
    StyleSheet,
    Image,
    Button,
    SafeAreaView,
    LayoutAnimation,
    ScrollView,
    UIManager,
    TouchableOpacity,
    Pressable
} from 'react-native';

import AppContext from "../context/AppContext";
import Icon from 'react-native-vector-icons/FontAwesome';

import { UserContext } from '../context/AppContextLogin';
import tailwind from "tailwind-rn";
import userService from "../services/user.service";
  
const Meetings =  ({ navigation: { navigate } },{}) =>  {

  const {userContext, setUserContext} = useContext(UserContext)

  const [meetingCreated,setmeetingCreated] = useState({})
  useEffect(()=>{
        (async()=>{
            let meetingCreatedFetch = await userService.getParticipationByIdOwner(userContext.id)
            console.log("meetingCreatedFetch",meetingCreatedFetch)
            setmeetingCreated(meetingCreatedFetch)
        })();

  },[])

  console.log("test igo",meetingCreated)

  return (

    
    <SafeAreaView style={{flex:1,marginTop:50}}>

        {Object(meetingCreated).map(meeting =>{
            return(
                <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                    <View style={styles.expandable}>
      
                    <View style={[{overflow:'hidden'},{borderRadius:20,padding:10,borderColor:'black',borderWidth:2}]}>
      
                          <View style={tailwind('flex flex-row  ')}>
                                <View >
                                    <View style={tailwind('flex flex-row ')}>
                                        <View style={tailwind('flex flex-row  mt-2')}>
                                            <Feather
                                                name='calendar'
                                                size={20}
                                            />
                                            <Text>11/08/2022</Text> 
                                        </View>
                                        <View style={tailwind('flex flex-row  mt-2 ml-3')}>
                                            <Feather
                                                name='clock'
                                                size={20}
                                            />
                                            <Text>18H</Text> 
                                        </View>
                                      <View style={tailwind('flex flex-row mt-2 ml-3')}>
                                        <Feather
                                            name='map-pin'
                                            size={20}
                                        />
                                        <Text>41 Rue Leclerc - Paris</Text>
                                      </View>                                    
                                    </View>
      
                                    
                                </View>
                          </View>
                        
                        <View
                            style={[styles.content]}
                        >
                            <View style={[tailwind('flex flex-row  ')]}>   
                                <View style={[tailwind('flex flex-row ')]}>
                                  <View style={tailwind('flex flex-row  mt-2')}>
                                      <Text style={styles.peopleText}>Njie Gueye</Text> 
                                  </View>
                                </View>
      
                                <View style={styles.containerButton}>
                                  <View style={styles.buttonAction1}>
                                    <TouchableOpacity style={styles.buttonText1}><Text style={tailwind('text-white text-center')}>Accepter</Text></TouchableOpacity>
                                  </View>
                                  <TouchableOpacity style={styles.buttonAction2}>
                                    <Text style={styles.buttonText2}>
                                      <Icon name="close"> </Icon>
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.separator}>
      
                            </View>
                            
                        </View>
      
                    </View>
                </View>
                    </View>
                </View>
            </View>
            )
        })}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
      flexDirection:'row',
      padding:10
  },
  titleText:{
      flex:1,
      fontSize:22,
      fontWeight:'bold'
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
  headerButton:{
      textAlign:'center',
      justifyContent:'center',
      fontSize:18
  },
  item:{
      backgroundColor:'white',
      padding:20,
      borderRadius: 8,
      borderWidth: 2
  },
  itemText:{
      fontSize:16,
      fontWeight:'500'
  },
  peopleText:{
    fontSize:18,
    fontWeight:'900'
  },
  content:{
      paddingLeft:10,
      paddingRight:10,
      padding:10
  },
  text:{
      fontSize:16,
      padding:10
  },
  separator:{
      height:0.5,
      backgroundColo:'red',
      width:'100%'
  },
  expandable:{
      marginBottom:25
  },
  button: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#3C5BAA',
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom : 30
  },
  buttonText1: {
    color: '#F6F9FA',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText2: {
    color: '#3C5BAA',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5
  },
  containerButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10
  },
  buttonAction1: {
    backgroundColor: '#3C5BAA',
    width: '45%',
    height: 25,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginLeft: 50
  },
  buttonAction2: {
    backgroundColor: 'white',
    borderColor: '#3C5BAA',
    borderWidth: 2,
    width: '15%',
    height: 25,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginLeft: 20
  }


});
export default Meetings;