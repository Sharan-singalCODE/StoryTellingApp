import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Switch
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import firebase from "firebase";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      isEnabled: false,
      light_theme: true,
      profile_image: "",
      name: ""
    };
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }
  toggleSwitch(){
    const previousState = this.state.isEnabled
    const theme = !this.state.isEnabled?"dark":"light"
    var updates={}
    updates["/users/"+firebase.auth().currentUser.uid+"/current_theme"] = theme
    firebase.database().ref().update(updates)
    this.setState({ isEnabled: !previousState,light_theme:previousState })
  }
 async fetchUser() {
    let theme,name,image
    await firebase.database().ref("/users/"+firebase.auth().currentUser.uid)
    .on('value',(data) => {
      theme= data.val().current_theme
      name= `${data.val().first_name} ${data.val().last_name} `
      image = data.val().profile_picture
    })
    this.setState({
       isEnabled:theme==='light'?false:true,
       light_theme:theme==='light'?true:false,
       name:name,
       profile_image:image,
       
      })
  }
  render(){
    if(!this.state.fontsLoaded){
 return <AppLoading />
    }else{
      return (

        <View style={this.state.light_theme?styles.containerLight:styles.container}>
          <SafeAreaView style={styles.droidSafeArea}/>
          <View style={styles.appTitle}>     
          <View style={styles.appIcon}>
            <Image source ={require ("../assets/logo.png")} 
           style={styles.iconImage} 
           />

         </View>
         <View style={styles.appTitleTextContainer}>
           <Text style={this.state.light_theme?styles.appTitleTextLight:styles.appTitleText}>Story Telling app</Text>
         </View>
          </View>
          <View style={styles.screenContainer}>
            <View style={styles.profileImageContainer}>
              <Image style={styles.profileImage} source={{uri:this.state.profile_image}}/>
              <Text style={this.state.light_theme?styles.nameTextLight:styles.nameText}>{this.state.name}</Text>
            </View>

            <View style={styles.themeContainer}>
              <Text style={this.state.light_theme?styles.themeTextLight:styles.themeText}>
                Dark Theme
              </Text>
              <Switch style={{transform:[{scaleX:1.3},{scaleY:1.3}]}}
              trackColor={{false:'#767577', true:this.state.light_theme?"#eeeeee":'white'}} 
              thumbColor={this.state.isEnabled?'#eea249':'#f4f3f4'}
               ios_backgroundColor = '#3e3e3e'
               onValueChange={()=>this.toggleSwitch()} value={this.state.isEnabled}

              />
              
            </View>
          </View>
        </View>
      );
    }

  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c"
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  screenContainer: {
    flex: 0.85
  },
  profileImageContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  profileImage: {
    width: RFValue(140),
    height: RFValue(140),
    borderRadius: RFValue(70)
  },

  nameText: {
    color: "white",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
    marginTop: RFValue(10)
  },
  nameTextLight: {
    color: "black",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
    marginTop: RFValue(10)
  },
  themeContainer: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: RFValue(20)
  },
  themeText: {
    color: "white",
    fontSize: RFValue(30),
    fontFamily: "Bubblegum-Sans",
    marginRight: RFValue(15)
  },
  themeTextLight: {
    color: "black",
    fontSize: RFValue(30),
    fontFamily: "Bubblegum-Sans",
    marginRight: RFValue(15)
  }
});