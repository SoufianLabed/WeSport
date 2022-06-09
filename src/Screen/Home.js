import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import tailwind from 'tailwind-rn';
import { Link, NavigationContainer } from '@react-navigation/native';
import StackScreen from '../../HomeStackScreen';

 const Home = ({ navigation: { navigate } }) =>{
  return (
    <View style={styles.container}>

        <View style={styles.contentContainer}> 

            <View style={styles.titleWrapper}>
                <TouchableHighlight onPress={() => navigate('Test', {})}>
                  <View>
                      <Text style={tailwind('border-solid border-4 text-center')}>HOME</Text>
                  </View>
                </TouchableHighlight>
            </View>
            <View style={styles.inputWrapper}>
                <Text>test</Text>
            </View>

        </View>

        <View style={styles.footer}>
          <StackScreen/>
        </View>
    </View>
    

  );
}
export default Home;

var styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
  },
  titleWrapper: {

  },
  inputWrapper: {

  },
  contentContainer: {
      flex: 1 // pushes the footer to the end of the screen
  },
  footer: {
      height: 100
  }
});