import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import tailwind from 'tailwind-rn';
import { Link } from '@react-navigation/native';

 const Home = ({ navigation: { navigate } }) =>{
  return (
    <View>
      <TouchableHighlight onPress={() => navigate('Test', {})}>
            <View>
                <Text style={tailwind('border-solid border-4 text-center')}>HOME</Text>
            </View>
     
      </TouchableHighlight>
    </View> 
  );
}
export default Home;
