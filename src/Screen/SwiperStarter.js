import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, Button, Pressable} from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';
import Feather from "react-native-vector-icons/Feather";

const Dots = ({ selected }) => {
  let backgroundColor;

    backgroundColor = selected ? '#3C5BAA' : '#F5F9FA';

    return (
        <View
            style={{
                marginBottom: 700,
                marginHorizontal: 3,
                width: 10,
                height: 10,
                borderRadius: 10 / 2,
                borderColor: '#3C5BAA',
                borderWidth : 1,
                backgroundColor,
                marginTop : 10
            }}
        />
    );
}

const Skip = ({...props}) => (
    <View style={styles.container}>


        <TouchableOpacity
            style={styles.footerSwp}
            {...props}
        >
            <Text style={{color : '#3C5BAA', fontSize: 17, fontWeight: 'bold'}}>Skip</Text>
        </TouchableOpacity>
    </View>

);

const Next = ({...props}) => (
    <View style={styles.container}>
        <TouchableOpacity
            style={styles.footerSwp}
            {...props}
        >
            <Text style={{color : '#3C5BAA', fontSize: 17, fontWeight: 'bold', left : 60}}>Next
            <Feather
                name='arrow-right'
                color='#3C5BAA'
                size={17}
            />
            </Text>
        </TouchableOpacity>
    </View>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{backgroundColor : '#F5F9FA', width : 360, padding : 20, justifyContent :'flex-end', alignItems:'flex-end'}}
        {...props}
    >
        <Text style={{color : '#3C5BAA', fontSize: 17, fontWeight: 'bold', right: 20, bottom: 5}}>Commencer</Text>
    </TouchableOpacity>
);

const SwiperStarter = ({navigation}) => {
    return (
        <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.replace("Login")}
        onDone={() => navigation.navigate("Login")}
        titleStyles={styles.titleOB}
        subTitleStyles={styles.subtitleOB}
        pages={[
          {
            backgroundColor: '#F5F9FA',
            image: <Image source={require('../../images/swiper-1.png')} style={styles.imgSwp}/>,
            title: 'Retrouve des sportifs !',
            subtitle: 'Trouve des ??v??nements ou cr??e-les !',
          },
          {
            backgroundColor: '#F5F9FA',
            image: <Image source={require('../../images/swiper-2.png')} style={styles.imgSwp}/>,
            title: 'S??l??ctionne les endroits',
            subtitle: 'Pr??s de chez toi ou renseigne une ville pr??cise',
          },
          {
            backgroundColor: '#F5F9FA',
            image: <Image source={require('../../images/swiper-3.png')} style={styles.imgSwp}/>,
            title: 'Envoi un message',
            subtitle: "Un ??v??nement te pla??t, envoi un message",
          },
        ]}
      />
    );
};

export default SwiperStarter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : '#F5F9FA',
    width : 180
  },
  imgSwp: {
      height : 300,
      width : 400,
      bottom : 50
  },
  titleOB: {
      color :'#091833',
      fontWeight : "bold",
      fontSize : 25,
      bottom : 100
  },
  subtitleOB: {
      color : '#091833',
      fontSize : 16,
      bottom : 80

  },
  footerSwp: {
      color : '#3C5BAA',
      padding : 15,
      left : 20
  },

});
