import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './src/component/Home';
import FlashScreen from './src/component/FlashScreen';
import PageAdmin from './src/component/PageAdmin';
import PageBackup from './src/component/PageBackup';
import PageAdminBackup from './src/component/PageAdminBackup';

const AppNavigator = createStackNavigator({
  FlashScreen: { screen: FlashScreen },
  Home: { screen: Home },
  PageAdmin: { screen: PageAdmin },
  PageBackup: { screen: PageBackup },
  PageAdminBackup: { screen: PageAdminBackup },
},
  { header: null, },
)

class App extends Component {

  render() {
    return (
      <Application />
    );
  }
}

export default createAppContainer(AppNavigator);