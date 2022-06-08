import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View 
            style={{
                width:5,
                height: 6,
                marginBottom: 650,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Login</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Done</Text>
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
        pages={[
          {
            backgroundColor: '#F5F9FA',
            image: <Image source={require('../../images/placeholder-.png')} style={{marginTop:-300}}/>,
            title: 'Retrouve des sportifs',
            subtitle: 'Trouve des événements ou créer les !',
          },
          {
            backgroundColor: '#F5F9FA',
            image: <Image source={require('../../images/placeholder-.png')} style={{marginTop:-300}}/>,
            title: 'Séléctionne les endroits',
            subtitle: 'Près de chez toi ou renseigne une ville précise',
          },
          {
            backgroundColor: '#F5F9FA',
            image: <Image source={require('../../images/placeholder-.png')} style={{marginTop:-300}}/>,
            title: 'Envoi un message',
            subtitle: "Un événement te plaît, envoi un message",
          },
        ]}
      />
    );
};

export default SwiperStarter;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});