import React,{Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import DrawerNavigator from '../Navigation/DrawerNavigator'

import {NavigationContainer} from '@react-navigation/native'
export default class DashBoard extends React.Component {
  render(){
  return (
<NavigationContainer>
    <DrawerNavigator/>
    </NavigationContainer>

    
  );
  }
}   
