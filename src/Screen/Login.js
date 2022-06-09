import { Button, StyleSheet, Text, View } from 'react-native';
import tailwind from 'tailwind-rn';

const Login = ({navigation}) =>{
  return (
    <View>
        <Text style={tailwind('border-solid border-4 text-center')}>HELLO WORLD</Text>
        <Button title="Home" onPress={() => navigation.navigate('Home')} />
        <Button title="SwiperStarter" onPress={() => navigation.navigate('SwiperStarter')} />
    </View>
  );
}
export default Login;
