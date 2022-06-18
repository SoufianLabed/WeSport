import { useContext,useState,useEffect } from 'react';
import { Button, StyleSheet, Text, View,Dimensions,Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import tailwind from 'tailwind-rn';
import AppContext from '../context/AppContext'
import {Marker, Callout } from 'react-native-maps';
import MapView from "react-native-map-clustering";
import * as Location from 'expo-location';
import userService from '../services/user.service';

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
      >
        <Callout>
          <View>
            <Text style={tailwind("font-bold m-24")}>THIS IS A TEST {i}</Text>
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
  });
  
export default Map;
