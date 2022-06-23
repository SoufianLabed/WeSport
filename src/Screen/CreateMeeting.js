import React, {
  useContext,
  Component,
  useState,
  useRef,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthService from "../services/auth.service";
import Feather from "react-native-vector-icons/Feather";
import {
  View,
  Text,
  TextInput,
  Platform,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  Pressable,
  TouchableHighlight,
} from "react-native";
import AppContext from "../context/AppContext";
import { UserContext } from "../context/AppContextLogin";
import tailwind from "tailwind-rn";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import DateTimePicker from '@react-native-community/datetimepicker';
import userService from "../services/user.service";
import SelectDropdown from 'react-native-select-dropdown'

const CreateMeeting = ({ navigation: { navigate } }) => {
  const [activityInput, onChangeactivityInput] = React.useState("Useless Text");
  const [locationInput, setLocationInput] = React.useState({});
  const [numberInput, onChangenumberInput] = React.useState("Useless Text");

  const [datePicker, setDatePicker] = useState(false); 
  const [date, setDate] = useState(new Date());
  
  const [timePicker, setTimePicker] = useState(false);
  const data = [["Big Data", "Hadoop", "Spark", "Hive"], ["Data Science" ,"Python","Ruby"]];
  const [time, setTime] = useState(new Date(Date.now()));

  const sports = ["FOOTBALL", "RUGBY"]

  function showDatePicker() {
    setDatePicker(true);
  };

  function showTimePicker() {
    setTimePicker(true);
  };

  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
    console.log("Date",date)
 };

  function onTimeSelected(event, value) {
    setTime(value)
    //setTime(date.toLocaleDateString()+" "+value.getHours()+":"+value.getMinutes()+":"+value.getSeconds());
    setTimePicker(false);
  };

  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  };

  const {userContext, setUserContext} = useContext(UserContext)
//yyyy-MM-dd'T'HH:mm:ss.SSS
  const ref = useRef();
  const createMeeting = async () => {
    let meeting = {};
    meeting.owner = userContext.id ,
    meeting.sport = activityInput ,
    meeting.numbre_joueur = numberInput,
    meeting.plannedAt = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes(),
        time.getSeconds(),
        time.getMilliseconds()
        ),
    //meeting.plannedAt = ,
    meeting.latitude = locationInput.geometry.location.lat,
    meeting.longitude = locationInput.geometry.location.lng,
    meeting.city = locationInput.address_components[2].long_name,
    meeting.address= locationInput.formatted_address
    console.log("meet ",meeting)

    await userService.postMeeting(meeting)
    
  };

  useEffect(() => {
    ref.current?.setAddressText("Some Text");
  }, []);
  return (
    <View style={tailwind("ml-16 mr-16")}>
      <Text style={tailwind("text-lg mt-8 mb-4")}>Nouvelle activité </Text>
      <View>
        <Text style={tailwind("text-lg mt-6 mb-4")}>Choix de l'activité</Text>
        {/*<TextInput
          style={styles.textInput}
          onChangeText={onChangeactivityInput}
          placeholder="useless placeholder"
        />*/}
      <SelectDropdown
              data={sports}
              
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                onChangeactivityInput(selectedItem)
                console.log("ici",activityInput)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
              buttonStyle={styles.textInput}
      />
      </View>
      <Text style={tailwind("text-lg mb-4")}>Address</Text>

      <GooglePlacesAutocomplete
        placeholder="Search"
        minLength={2}
        returnKeyType={"search"}
        styles={{
          textInputContainer: {
            backgroundColor: "grey",
          },
          description: {
            fontWeight: "bold",
          },
          predefinedPlacesDescription: {
            color: "#1faadb",
          },
          textInput: {
            borderColor: "gray",
            width: "100%",
            borderWidth: 1,
            borderRadius: 10,
            padding: 6,
            marginBottom: 15,
          },
          listView: {
            color: "black", //To see where exactly the list is
            zIndex: 1000, //To popover the component outwards
            position: "absolute",
            top: 45,
          },
        }}
        onFail={(error) => console.error(error)}
        fetchDetails={true}
        onPress={(data, detail = null) => {
          //console.log("ville",detail.vicinity);
          console.log("address",detail.formatted_address);
          console.log("VILLE",detail.address_components[2].long_name);
          setLocationInput(detail)
        }}
        query={{
          key: "AIzaSyBu3rpxeGURsWeIpnTy6oZkgtVbqqtjiNs",
          language: "fr",
        }}
      />

      
      <View>
        <Text style={tailwind("text-lg  mt-16 mb-4")}>
          Combien de personnes
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangenumberInput}
          placeholder="useless placeholder"
          keyboardType="number-pad"
        />
      </View>
      <View style={tailwind('flex flex-row items-center justify-center mt-3 my-3')}>
      {datePicker && (
          <DateTimePicker
            value={date}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={onDateSelected}
            style={styles.datePicker}
          />
        )}

        {timePicker && (
          <DateTimePicker
            value={time}
            mode={'time'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={false}
            onChange={onTimeSelected}
            style={styles.datePicker}
          />
        )}

        {!datePicker && (
          <View style={tailwind('m-1 flex flex-row')}>
            <Feather
              name='calendar'
              size={20}
              onPress={showDatePicker}
             />
              <Text>
                {date.getDate()+"/"+date.getMonth()}
             </Text>
          </View>
        )}

        {!timePicker && (
          <View style={tailwind('flex flex-row')}>
           <Feather
              name='clock'
              size={20}
              onPress={showTimePicker}
             />
             <Text>
              {time.getHours()+":"+time.getMinutes()}
             </Text>
          </View>
        )}

      </View>

  
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
            createMeeting()
        }}
      >
        <Text style={styles.text}>CREATE</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({

    dateContainer:{
        display: 'flex'
    },
    datePicker: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 320,
        height: 260,
        display: 'flex',
        marginLeft:'10px',
        marginRight:'1px'
      },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: "black",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  button_test: {
    margin: "80px",
    backgroundColor: "red",
  },
  google: {
    width: "80px",
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    textAlign: "center",
    alignItems: "center",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 6,
    marginBottom: 15,
    marginTop: 10,
    backgroundColor: "white",
  },
  logoHK: {
    top: 100,
    left: "11%",
    height: 200,
    width: 300,
  },
});

export default CreateMeeting;

/*
                <View>
                    <View>
                        <Text style={tailwind('text-lg mr-36 mt-8 mb-4')}>Choix de l'activité</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={onChangeactivityInput}
                            placeholder="useless placeholder"
                        />
                    </View>
                    <View>
                        <Text style={tailwind('text-lg mr-36 mt-8 mb-4')}>Adresse</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={onChangeaddressInput}
                            placeholder="useless placeholder"
                        />
                    </View>
                    <View>
                        <Text style={tailwind('text-lg mr-36 mt-8 mb-4')}>Combien de personnes</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={onChangenumberInput}
                            placeholder="useless placeholder"
                            keyboardType = 'number-pad'
                        />
                    </View>
                    <Button title='TEST'/>
                </View>


                <GooglePlacesAutocomplete
                    placeholder="Search"
                    minLength={2}
                    returnKeyType={'search'}
                    styles={{
                        description: {
                          fontWeight: 'bold',
                        },
                        predefinedPlacesDescription: {
                          color: '#1faadb',
                        },
                        listView: {
                          color: 'black', //To see where exactly the list is
                          zIndex: 1000, //To popover the component outwards
                          position: 'absolute',
                          top: 45
                        },
                      }}
                    onFail={error => console.error(error)}
                    fetchDetails={true}
                    onPress={(data,detail = null)=>{
                        console.log(data,detail)
                    }}
                    query={{
                        key:'AIzaSyBu3rpxeGURsWeIpnTy6oZkgtVbqqtjiNs',
                        language:'fr'
                    }}
            />
  */
