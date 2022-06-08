<<<<<<< HEAD
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import tailwind from 'tailwind-rn';
import { Link } from '@react-navigation/native';

 const Login = ({ navigation: { navigate } }) =>{
  return (
    <View>
      <TouchableHighlight onPress={() => navigate('Test', {})}>
            <View>
                <Text style={tailwind('border-solid border-4 text-center')}>LOGIN</Text>
            </View>
     
      </TouchableHighlight>
    </View> 
=======
import { Button, StyleSheet, Text, View } from 'react-native';
import tailwind from 'tailwind-rn';

const Login = ({navigation}) =>{
  return (
    <View>
        <Text style={tailwind('border-solid border-4 text-center')}>HELLO WORLD</Text>
        <Button title="Swiper" onPress={() => navigation.navigate("SwiperStarter")} />
    </View>
>>>>>>> ef1091cc8e80f63870d68574543ce3fbf735e3de
  );
}
export default Login;
