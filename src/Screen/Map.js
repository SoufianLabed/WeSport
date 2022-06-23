import React, { useContext,useState,useEffect } from 'react';
import { Button, StyleSheet, Text, View,Dimensions,Image, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import tailwind from 'tailwind-rn';
import AppContext from '../context/AppContext'
import {Marker, Callout } from 'react-native-maps';
import MapView from "react-native-map-clustering";
import * as Location from 'expo-location';
import userService from '../services/user.service';
import Feather from 'react-native-vector-icons/Feather';

const Map = ({navigation}) =>{
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [meetings,setMeetings] = useState([]);

  useEffect(() => {
    (async () => {
      let meetings = await userService.getMeeting()
      console.log("meetings",meetings.data);
      setMeetings(meetings.data)
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location2 = await Location.getCurrentPositionAsync({});
      setLocation(location2);

    })();
  }, []);


  const [text, setText] = useState('')
  const {counter, setCounter} = useContext(AppContext)
  const tokyoRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const initialRegion = {
    latitude: 37.72825,
    longitude: -122.4324,
    latitudeDelta: 0.25,
    longitudeDelta: 0.15
  };


  function renderRandomMarkers(meetings) {
    return meetings.map((meeting, i) => (
      <Marker
        key={i}
        coordinate={{
          latitude: parseFloat(meeting.latitude),
          longitude: parseFloat(meeting.longitude)
        }}
        icon={require('../../assets/MarkerFootball.png')}
        style={{width:200}}
      >
        <Callout>
        <View style={tailwind('flex flex-row')}>
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
                    <Text style={styles.buttonText}>Participer</Text>
                </Pressable>
            </View>
        </View>
        </Callout>
      </Marker>
    ));
  }
  
  return (
    <View style={styles.container}>
        {/*<TextInput*/}
        {/*    placeholder="Ex : Rafael David "*/}
        {/*    style={styles.textInput}*/}
        {/*    autoCapitalize='none'*/}
        {/*/>*/}
      <MapView
        initialRegion={initialRegion}
        style={styles.map}>
        {renderRandomMarkers(meetings)}
      </MapView>

        
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
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
    // textInput: {
    //     flex: 1,
    //     paddingLeft: 10,
    //     color: '#05375a',
    //     borderWidth : 1,
    //     height: 49,
    //     borderTopLeftRadius: 8,
    //     borderTopRightRadius: 8,
    //     borderBottomLeftRadius: 8,
    //     borderBottomRightRadius: 8,
    //     borderColor : '#3C5BAA',
    // },
  });
  
export default Map;
