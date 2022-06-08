import { Image } from 'react-native';
import React from 'react';

import Onboarding from 'react-native-onboarding-swiper'; // 1.1.4

const SwiperStarter = () => (
  <Onboarding
    pages={[
      {
        backgroundColor: '#F5F9FA',
        title: 'Onboarding',
        image: <Image source={require('../../images/placeholder-.png')} />,
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      {
        backgroundColor: '#F5F9FA',
        image: <Image source={require('../../images/placeholder-.png')} />,
        title: 'The Title',
        subtitle: 'This is the subtitle that sumplements the title.',
      },
      {
        backgroundColor: '#F5F9FA',
        image: <Image source={require('../../images/placeholder-.png')} />,
        title: 'Triangle',
        subtitle: "Beautiful, isn't it?",
      },
    ]}
  />
);

export default class App extends React.Component {
  render() {
    return (
      <SwiperStarter />
    );
  }
}

