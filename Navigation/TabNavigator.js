import React from 'react';
import FeedScreen from '../screens/FeedScreen';
import CreateStory from '../screens/CreateStories';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize' 
import {StyleSheet} from 'react-native'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import firebase from 'firebase'
const Tab = createMaterialBottomTabNavigator();
export default class  BottomTabNavigator  extends React.Component{
 constructor(props) {
   super(props)
   this.state={
     light_theme: true,
   }
 }
 componentDidMount() {
  let theme
     firebase.database().ref("/users/"+firebase.auth().currentUser.uid)
  .on('value',(data) => {
    theme= data.val().current_theme
  })
  this.setState({
     light_theme:theme==='light'?true:false,
    })
}
  render() {
   return (
    <Tab.Navigator
    labeled = {false}
    barStyle = {this.states.light_theme?styles.bottomTabStyleLight:styles.bottomTabStyle}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Feed') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Create') {
            iconName = focused ? 'create' : 'create-outline';
          }
          return <Ionicons name={iconName} size={RFValue(25)} color={color} style={styles.icons} />;
        },
      })}
     activeColor= {'#eea249'} inactiveColor={'gray'}>
      <Tab.Screen name="Feed" component={FeedScreen} />

      <Tab.Screen name="Create" component={CreateStory} />
    </Tab.Navigator>
  );
};
}
const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "#2f345d",
    height: "8%",
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
    overflow: "hidden",
    position: "absolute"
  },
  bottomTabStyleLight: {
    backgroundColor: "#eaeaea",
    height: "8%",
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
    overflow: "hidden",
    position: "absolute"
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30)
  }
});
