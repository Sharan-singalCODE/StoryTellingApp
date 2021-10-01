import * as React from 'react';
import DrawerNavigator from './Navigation/DrawerNavigator'
import {NavigationContainer} from '@react-navigation/native'
import Login from './screens/LoginScreen'
import firebase from 'firebase'
import {firebaseConfig} from './config'
import LoadingScreen from './screens/LoadingScreen'
import Dashboard from './screens/Dashboardscreen'
import {createSwitchNavigator,createAppContainer} from 'react-navigation' 

const SwitchNavigator= createSwitchNavigator({
  LoadingScreen:LoadingScreen,
  Login:Login,
  Dashboard:Dashboard
})
const AppContainer =createAppContainer(SwitchNavigator)

if(!firebase.apps.length){
   firebase.initializeApp(firebaseConfig);
}else{
  firebase.app()
}
export default function App() {

  return (
 <AppContainer/>
  );
}

