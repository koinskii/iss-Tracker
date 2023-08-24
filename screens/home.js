import React from "react";
import { View, TouchableOpacity, TextInput, Text, StyleSheet, Alert, ImageBackground, StatusBar, Platform, Image } from "react-native"

import { SafeAreaView } from "react-native-safe-area-context";
import issLocation from "./issLocation";

var bgImage = require("../assets/bg_image.png")
var issIcon = require("../assets/iss_icon.png")
var meteorIcon = require("../assets/meteor_icon.png")
var RocketIcon = require("../assets/rocket_icon.png")

export default class home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (

            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea}/>
                <ImageBackground source={bgImage} style={styles.backgroundImage}>
                    <View style={styles.titleBar}>
                    <Text style={styles.titleText}>home</Text>
                    </View>
                    {/* <View> */}
                        <TouchableOpacity style={styles.routeCards} onPress={() => this.props.navigation.navigate('issLocation')}> 
                            <Image source={issIcon} style={styles.iconImage}></Image>
                            <Text style={styles.routeText}>Iss Location</Text>
                            <Text style={styles.bgDigit}>1</Text>
                            <Text style={styles.knowMore}>{"know more --->"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.routeCards} onPress={() => this.props.navigation.navigate('Meteors')}>
                            <Image source={meteorIcon} style={styles.iconImage}></Image>
                            <Text style={styles.routeText}>Meteors</Text>
                            <Text style={styles.bgDigit}>2</Text>
                            <Text style={styles.knowMore}>{"know more --->"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.routeCards} onPress={() => this.props.navigation.navigate('Update')}>
                            <Image source={RocketIcon} style={styles.iconImage}></Image>
                            <Text style={styles.routeText}>Update</Text>
                            <Text style={styles.bgDigit}>3</Text> 
                            <Text style={styles.knowMore}>{"know more --->"}</Text>
                        </TouchableOpacity>

                    {/* </View> */}
                </ImageBackground>
            </View>


        ) 
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    droidSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    backgroundImage: {
      flex: 1,
      resizeMode: "cover",
    },
    titleBar: {
      flex: 0.15,
      justifyContent: "center",
      alignItems: "center",
    },
    titleText: {
      fontWeight: "bold",
      fontSize: 40,
      color: "white",
    },
    routeCards: {
      flex: 0.25,
      justifyContent: "center",
      alignItems:"center",
      alignSelf: "center",
      borderRadius: 30,
      backgroundColor: "white",
      marginLeft: 50,
      marginRight: 50,
      marginTop: 50,
      width: 300,
    },
    routeText: {
      fontWeight: "bold",
      fontSize: 35,
      color: "black",
      marginTop: 75,
      paddingLeft: 30,
    },
    iconImage: {
      position: "absolute",
      height: 200,
      width: 200,
      resizeMode: "contain",
      right: 20,
      top: -80,
    },
    knowMore: {
      paddingLeft: 30,
      color: "red",
      fontSize: 15,
    },
    bgDigit: {
      position: "absolute",
      color: "rgba(183,183,183,0.5)",
      fontSize: 150,
      right: 20,
      bottom: -15,
      zIndex: -1,
    },
  });