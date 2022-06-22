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

import { UserContext } from '../context/AppContextLogin';
import tailwind from "tailwind-rn";
import userService from "../services/user.service";
  
const Meetings =  ({ navigation: { navigate } },{}) =>  {

    const {userContext, setUserContext} = useContext(UserContext)

    useEffect(()=>{
        const meetingCreatedFetch = async () =>{
            return await userService.getMeetingByIdOwner(userContext.id)
        }

        const meetingParticipationFetch = async () =>{
            return await userService.getMeetingParticipationById(userContext.id)
        }

        const meetingCreated = meetingCreatedFetch()
        const meetingParticipation = meetingParticipationFetch()

    },[])

    const CONTENT = [
        {
            isExpanded: false,
            category_name:'Activités crées',
            subcategory:[
                {id:1,val:'Sub 1'},
                {id:2,val:'Sub 2'},
                ]
        },
        {
            isExpanded: false,
            category_name:'Activités à laquelle je suis participant',
            subcategory:[
                {id:3,val:'Sub 4'},
                {id:4,val:'Sub 5'},
                ]
        },
        {
            isExpanded: false,
            category_name:'Activité en attente d\'acceptation',
            subcategory:[
                {id:5,val:'Sub 6'},
                {id:6,val:'Sub 7'},
                ]
        },


    ]
    const [listDataSource, setlistDataSource] = useState(CONTENT)

    const updateLayout = (index) =>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const array = [...listDataSource];
            array[index]['isExpanded'] = !array[index]['isExpanded']
        
        setlistDataSource(array)
    }

    const ExpandableComponent = ({item,onClickFunction}) =>{
        const [layoutHeight, setlayoutheight] = useState(0);

        useEffect(()=>{
            if(item.isExpanded){
                setlayoutheight(null);
            }else{
                setlayoutheight(0)
            }
        },[item.isExpanded])
        return (
            <View style={styles.expandable}>
                <TouchableOpacity style={styles.item} onPress={onClickFunction}>
                    <Text style={styles.itemText}>
                        {item.category_name}
                    </Text>
                </TouchableOpacity>
                <View style={{height:layoutHeight,overflow:'hidden'}}>
                    {
                        item.subcategory.map((item,key)=>(
                            <TouchableOpacity
                                key={key}
                                style={styles.content}
                            >
                                <View style={tailwind('flex flex-row  ')}>
                                    <View >
                                        <Text style={tailwind('mt-4 text-lg')}>Basket</Text>
                                        <Text>Idrissa Mguye</Text>
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
                                        </View>
                                        <View style={tailwind('mt-3 flex flex-row')}>
                                            <Feather
                                                name='map-pin'
                                                size={20}
                                            />
                                            <Text>41 Rue Leclerc - Paris</Text>
                                        </View>
                                        
                                    </View>

                                    <View style={tailwind('absolute top-0 right-0 h-16 w-20 mt-3')}>
                                        <Pressable style={styles.button}>
                                            <Text style={styles.buttonText}>Voir</Text>
                                        </Pressable>
                                        <Pressable style={styles.button}>
                                            <Text style={styles.buttonText}>Supprimer</Text>
                                        </Pressable>
                                    </View>
                                </View>
                                <View style={styles.separator}>

                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        )
    }

    return (
      <SafeAreaView style={{flex:1,marginTop:50}}>
        <View style={styles.container}>
            <View style={styles.header}>
                <ScrollView>
                    {
                        listDataSource.map((item,key)=>(
                            <ExpandableComponent
                                key={item.category_name}
                                item={item}  
                                onClickFunction={()=>{
                                updateLayout(key)
                              }}
                            />
                        ))
                    }
                </ScrollView>
            </View>
        </View>
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
    content:{
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:'#fff',
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
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
       marginBottom : 30
   },
   buttonText: {
        color: '#F6F9FA',
        fontWeight: 'bold',
        textAlign: 'center'
   }


  });
  export default Meetings;