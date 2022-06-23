import { useContext,useState,useEffect } from 'react';
import { Button, StyleSheet, Text, View,Dimensions,Image, Switch,Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import tailwind from 'tailwind-rn';
import AppContext from '../context/AppContext'
import {Marker, Callout } from 'react-native-maps';
import MapView from "react-native-map-clustering";
import * as Location from 'expo-location';
import userService from '../services/user.service';
import Feather from "react-native-vector-icons/Feather";

const Map = ({navigation}) =>{
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [meetings,setMeetings] = useState([]);

  useEffect(() => {
    (async () => {
      let meetings = await userService.getMeeting()
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

  const refreshData = async () =>{
    let meetings = await userService.getMeeting()
    setMeetings(meetings.data)
  }


  const [text, setText] = useState('')
  const {counter, setCounter} = useContext(AppContext)
  const tokyoRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const initialRegion = {
    latitude: 48.856614,
    longitude: 2.3522219,
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
       // icon={require( "../../assets/marker-football.png")}
      >

        <Callout style={tailwind('rounded-lg w-56')}>
        <View style={tailwind('flex flex-row   ')}>
            <View >
                <Text style={tailwind('mt-4 text-lg')}>{meeting.sport}</Text>
      
                <View style={tailwind('flex flex-row ')}>
                    <View style={tailwind('flex flex-row  mt-2')}>
                        <Feather
                            name='calendar'
                            size={20}
                        />
                        <Text>{new Date(meeting.plannedAt).getFullYear()+"/"+new Date(meeting.plannedAt).getMonth()+"/"+new Date(meeting.plannedAt).getDate() }</Text> 
                    </View>
                    <View style={tailwind('flex flex-row  mt-2 ml-3')}>
                        <Feather
                            name='clock'
                            size={20}
                        />
                        <Text>{new Date(meeting.plannedAt).getHours()+" : "+new Date(meeting.plannedAt).getMinutes()}</Text> 
                    </View>                                      
                </View>
                <View style={tailwind('mt-3 flex flex-row')}>
                    <Feather
                        name='map-pin'
                        size={20}
                    />
                    <Text>{meeting.address}</Text>
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
      <MapView
        initialRegion={initialRegion}
        style={styles.map}>
        {renderRandomMarkers(meetings)}
      </MapView>
      <TextInput
          placeholder="Rechercher une ville"
          style={styles.textInput}
          autoCapitalize='none'
          // textAlign='center'
      />
      <Feather
          name="search"
          color="#3C5BAA"
          size={20}
          style={styles.searchIcon}
      />
      <View style={styles.boxFilter}>
          <View style={styles.filters}>
              <Pressable>
                  <Image
                      style={styles.iconFilter}
                      source={require('../../images/icon-foot.png')}
                  />
              </Pressable>

              <Pressable>
                  <Image
                      style={styles.iconFilter}
                      source={require('../../images/icon-tennis.png')}
                  />
              </Pressable>

              <Pressable>
                  <Image
                      style={styles.iconFilter}
                      source={require('../../images/icon-basket.png')}
                  />
              </Pressable>

              <Pressable>
                  <Image
                      style={styles.iconFilter}
                      source={require('../../images/icon-volley.png')}
                  />
              </Pressable>

          </View>
          <View style={styles.labelFilters}>
              <Text style={{color : '#09183399', fontStyle : 'italic'}}>Football</Text>
              <Text style={{color : '#09183399', fontStyle : 'italic'}}>Tennis</Text>
              <Text style={{color : '#09183399', fontStyle : 'italic'}}>Basket</Text>
              <Text style={{color : '#09183399', fontStyle : 'italic'}}>Volley</Text>
          </View>
      </View>
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
    textInput: {
        flex: 1,
        paddingLeft: 50,
        top: 100,
        width : '75%',
        position: 'absolute',
        color: '#05375a',
        borderWidth : 1,
        height: 49,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderColor : '#3C5BAA',
        backgroundColor : '#F5F9FA',
        fontSize : 14
    },
    searchIcon: {
        position : 'absolute',
        top : 115,
        left : 60,
    },
    boxFilter: {
        backgroundColor : '#F5F9FA',
        borderTopLeftRadius: 44,
        borderTopRightRadius: 44,
        borderBottomLeftRadius: 44,
        borderBottomRightRadius: 44,
        height : 84,
        width : '80%',
        bottom : 585
    },
    filters: {
        flexDirection : "row",
        justifyContent : "space-evenly",
        top : 10,
        marginLeft : 8


    },
    iconFilter: {
        height: 46,
        width : 46,

    },
    labelFilters: {
        flexDirection : "row",
        justifyContent : "space-evenly",
        top : 15
    }

});
  
export default Map;
