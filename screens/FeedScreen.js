import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  FlatList,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import StoryCard from './StoryCard';
import Apploading from 'expo-app-loading';
import * as Font from 'expo-font';
let customFont = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};
let stories = require('./temp_stories.json');

export default class FeedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme:true,
      stories:[],
    };
  }
  async loadFontAsync() {
    await Font.loadAsync(customFont);
    this.setState({
      fontsLoaded: true,
    });
  }
  fetchStories=()=>{
    firebase.database().ref("/posts/")
    .on("value", (data)=>{
      let stories =[],
      if(data.val()){
        Object.keys(data.val()).forEach(function(key){
          stories.push({
            key:key,
            value:data.val()[key],

          })
        })
      }
      this.setState({
        stories:stories,
      })
    },function(error){
      alert(error.message)
    })
  }
  componentDidMount() {
    this.loadFontAsync()
    this.fetchStories()
    let theme
       firebase.database().ref("/users/"+firebase.auth().currentUser.uid)
    .on('value',(data) => {
      theme= data.val().current_theme
    })
    this.setState({
       light_theme:theme==='light'?true:false,
      })
  }
  renderItem=({ item:story })=>{
    return<StoryCard story={story} 
    navigation ={this.props.navigation}/>
  }
  keyExtractor=(item,index)=>index.toString()
  render() {
    if (!this.state.fontsLoaded) {
      return <Apploading />;
    } else {
      return (
        <View
          style= {thhis.state.light_theme?styles.containerLight:styles.container}>
          <SafeAreaView style={styles.droidSafeArea}/>
          <View style={styles.appTitle}>
          <View style={styles.appIcon} >
          <Image source ={ require('../assets/logo.png')} style= {styles.iconImage}/>
          </View>
          <View style={styles.appTitleTextContainer}>
          <Text style={this.state.light_theme?styles.appTitleTextLight:styles.appTitleText}>Story telling app by sharan</Text>
          </View>
          </View>
          {!this.state.stories[0]?
          <View style ={styles.noStories}>
            <Text style={this.state.light_theme?styles.noStoriesTextLight:styles.noStoriesText}>

              No stories found
            </Text>
            
          </View>:
          <View style={styles.cardContainer}>
          <FlatList keyExtractor={this.keyExtractor} data={this.state.stories} renderItem={this.renderItem}/>
          </View>
        }
          
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
  cardContainer: {
    flex: 0.85
  },
  noStories: {
    flex: 0.85,
    justifyContent: "center",
    alignItems: "center"
  },
  noStoriesTextLight: {
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans"
  },
  noStoriesText: {
    color: "white",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans"
  }
});