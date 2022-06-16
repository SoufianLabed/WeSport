import { useContext,useState,useEffect } from 'react';
import { Button, StyleSheet, Text, View,Dimensions,Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import tailwind from 'tailwind-rn';
import AppContext from '../context/AppContext'
import {Marker, Callout } from 'react-native-maps';
import MapView from "react-native-map-clustering";
import * as Location from 'expo-location';

const Map = ({navigation}) =>{
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location2 = await Location.getCurrentPositionAsync({});

      console.log("location",location)
      //console.log("coordX",location.coords.latitude)
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


  function renderRandomMarkers(n) {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = initialRegion;
    return new Array(n).fill().map((x, i) => (
      <Marker
        key={i}
        coordinate={{
          latitude: latitude + (Math.random() - 0.5) * latitudeDelta,
          longitude: longitude + (Math.random() - 0.5) * longitudeDelta
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
        {renderRandomMarkers(144)}
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
