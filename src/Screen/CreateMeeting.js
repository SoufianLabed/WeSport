import React, {
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import Feather from "react-native-vector-icons/Feather";
import {
    View,
    Text,
    TextInput,
    Platform,
    StyleSheet,
    TouchableHighlight,
} from "react-native";
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
        console.log("meet",meeting)

        await userService.postMeeting(meeting)

    };

    useEffect(() => {
        ref.current?.setAddressText("Some Text");
    }, []);
    return (
        <View style={styles.container1}>
            <View style={styles.container2}>
                <Text style={styles.title1}>Nouvelle activité </Text>
                <View style={{paddingLeft:10}}>
                    <Text style={[styles.inputTitle, tailwind("text-lg mt-6 mb-4")]}>Choix de l'activité</Text>
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
                        defaultButtonText={'Choisir un sport'}
                        buttonTextStyle={{color : '#091833'}}

                    />
                </View>
                <Text style={[{paddingLeft : 10}, styles.inputTitle, tailwind("text-lg mt-6 mb-4")]}>Adresse</Text>

                <GooglePlacesAutocomplete
                    placeholder="Rechercher"
                    minLength={2}
                    returnKeyType={"search"}
                    styles={{
                        textInputContainer: {
                            backgroundColor: "grey",
                            paddingLeft : 10
                        },
                        description: {
                            fontWeight: "bold",
                        },
                        predefinedPlacesDescription: {
                            color: "#1faadb",
                        },
                        textInput: {
                            borderColor: "#3C5BAA",
                            width: "100%",
                            borderWidth: 1,
                            borderRadius: 10,
                            padding: 6,
                            marginBottom: 15,
                            height: 50
                        },
                        listView: {
                            color: "black", //To see where exactly the list is
                            zIndex: 1000, //To popover the component outwards
                            position: "absolute",
                            top: 45,
                            borderColor : '#3C5BAA',
                            borderWidth: 1,
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


                <View style={{paddingLeft:10}}>
                    <Text style={[styles.inputTitle, tailwind("text-lg  mt-16 mb-4")]}>
                        Nombre de personnes
                    </Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={onChangenumberInput}
                        placeholder="Nombre"
                        keyboardType="number-pad"
                    />
                </View>
                <View style={[styles.datePick, tailwind('flex flex-row items-center justify-center mt-3 my-3')]}>
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
                    <Text style={styles.text}>Créér</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    datePicker: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 320,
        height: 260,
        display: 'flex',
        marginLeft:'10px',
        marginRight:'1px',
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        height : 46,
        backgroundColor: "#3C5BAA",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#3C5BAA",
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
    textInput: {
        borderColor: "#3C5BAA",
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 6,
        marginTop: 10,
        backgroundColor: "white",
        height: 50
    },
    container2: {
        backgroundColor : '#FFFFFF',
        margin : 50,
        marginTop : 140

    },
    container1: {
        backgroundColor : '#FFFFFF',
        height : '100%'

    },
    title1: {
        fontSize : 30,
        fontWeight: 'bold',
    },
    inputTitle: {
        fontSize : 20,
        fontWeight : 'bold'
    },
    datePick: {
        padding : 10
    }

});

export default CreateMeeting;