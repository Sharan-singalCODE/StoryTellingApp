import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Speech from 'expo-speech';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

let customFont = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class StoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      speakercolor: 'gray',
      speakerIcon: 'volume-high-outline',
      light_theme:true,
    };
  }
  async initiateTTS(title, author, story, moral) {
    const currentColor = this.state.speakercolor;
    this.setState({
      speakercolor: currentColor === 'gray' ? '#eea249' : 'gray',
    });
    if (currentColor === 'gray') {
      Speech.speak(`${title} by ${author}`);
      Speech.speak(story);
      Speech.speak('The moral of the story is');
      Speech.speak(moral);
    } else {
      Speech.stop();
    }
  }
  async loadFontAsync() {
    await Font.loadAsync(customFont);
    this.setState({
      fontsLoaded: true,
    });
  }
  componentDidMount() {
    this._loadFontsAsync()
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
    if (!this.props.route.params) {
      this.props.navigation.navigate('Home');
    } else if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={this.state.light_theme?styles.containerLight:styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.iconImage}
              />
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>
                Story telling app by sharan
              </Text>
            </View>
          </View>
          <View style={styles.storyContainer}>
            <ScrollView style={styles.storyCard}>
              <Image
                source={require('../assets/story_image_1.png')}
                style={styles.image}
              />
              <View style={styles.dataContainer}>
                <View style={styles.titleTextContainer}>
                  <Text style={styles.storyTitleText}>
                    {this.props.route.params.story.title}
                  </Text>
                  <Text style={styles.storyAuthorText}>
                    {this.props.route.params.story.author}
                  </Text>
                  <Text style={styles.storyAuthorText}>
                    {this.props.route.params.story.created_on}
                  </Text>
                </View>
                <View style={styles.iconContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      this.initiateTTS(
                        this.props.route.params.story.title,
                        this.props.route.params.story.author,
                        this.props.route.params.story.story,
                        this.props.route.params.story.moral
                      );
                    }}>
                    <Ionicons
                      name={this.state.speakerIcon}
                      size={RFValue(30)}
                      color={this.state.speakercolor}
                      style={{ margin: RFValue(15) }}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.storyTextContainer}>
                <Text style={styles.storyText}>
                  {this.props.route.params.story.story}
                </Text>
                <Text style={styles.moralText}>
                  the moral: {this.props.route.params.story.moral}
                </Text>
              </View>
              <View style={styles.actionContainer}>
                <View style={styles.likeButton}>
                  <Ionicons name={'heart'} size={RFValue(30)} color="white" />
                  <Text style={styles.likeText}>12k</Text>
                </View>
              </View>
            </ScrollView>
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
  storyContainer: {
    flex: 1
  },
  storyCard: {
    margin: RFValue(20),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  storyCardLight: {
    margin: RFValue(20),
    backgroundColor: "white",
    borderRadius: RFValue(20),
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2
  },
  image: {
    width: "100%",
    alignSelf: "center",
    height: RFValue(200),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    resizeMode: "contain"
  },
  dataContainer: {
    flexDirection: "row",
    padding: RFValue(20)
  },
  titleTextContainer: {
    flex: 0.8
  },
  storyTitleText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "white"
  },
  storyTitleTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "black"
  },
  storyAuthorText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "white"
  },
  storyAuthorTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "black"
  },
  iconContainer: {
    flex: 0.2
  },
  storyTextContainer: {
    padding: RFValue(20)
  },
  storyText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(15),
    color: "white"
  },
  storyTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(15),
    color: "black"
  },
  moralText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(20),
    color: "white"
  },
  moralTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(20),
    color: "black"
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: RFValue(10)
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    flexDirection: "row",
    backgroundColor: "#eb3948",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  },
  likeTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  }
});