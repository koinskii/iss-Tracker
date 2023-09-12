import axios from "axios";
import React from "react";
import { ImageBackground } from "react-native";
import { View, TouchiableOpacity, TextInput, Text, StyleSheet, Alert, SafeAreaView, FlatList, StatusBar, Dimensions,Image } from "react-native"
import { ZoomInEasyDown } from "react-native-reanimated";




export default class Meteors extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            meteors: {}
        }
    }
    componentDidMount() {
        this.getMeteors();
    }
    getMeteors = () => {
        axios.get('https://api.nasa.gov/neo/rest/v1/feed?api_key=Dx7dKxu906ADQFEcMceU0JxHiPrz4FLYkSCkcYJE')
            .then((response) => {
                this.setState({
                    meteors: response.data.near_earth_objects
                })
                // console.log(Object.keys(this.state.meteors))
            })
            .catch((error) => {
                alert(error.message) 
            })
    }
    renderItem = ({ item }) => {
        let meteor = item
        var bgImg, speed, size

        speed = require("../assets/meteor_speed1.gif")

        if (meteor.threat_score <= 30) {
            bgImg = require("../assets/meteor_bg1.png")
            size = 100
        } else if (meteor.threat_score <= 75) {
            bgImg = require("../assets/meteor_bg2.png")
            size = 150

        } else {
            bgImg = require("../assets/meteor_bg3.png")
            size = 200
        }

        return ( 
            <View>
                <ImageBackground style={styles.backgroundImage} source={bgImg}>
                    <View style={styles.gifContainer}>
                       <Image source={speed} style={{width:size,height: size, alignSelf:"center"}}/>
                       <View>
                        <Text style={styles.cardTitle}>
                            {item.name}
                        </Text>
                        <Text style={[styles.cardText,{marginLeft: 50}]}>
                            data aproximada: {item.close_approach_data[0].close_approach_date_full}
                        </Text>
                        <Text style={styles.cardText}>
                            diametro minimo: {item.estimated_diameter.kilometers.estimated_diameter_min}
                        </Text>
                        <Text style={styles.cardText}>
                            diametro maximo: {item.estimated_diameter.kilometers.estimated_diameter_max}
                        </Text>
                        <Text style={styles.cardText}>
                            velocidade: {item.close_approach_data[0].relative_velocity.kilometers_per_hour}
                        </Text>
                        <Text style={styles.cardText}>
                            distancia da terra: {item.close_approach_data[0].miss_distance.kilometers}
                        </Text>
                       </View>
                    </View>
                </ImageBackground>
            </View>
        )

    }

    render() {
        if (Object.keys(this.state.meteors).length == 0) {
            return (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>
                        Loading...
                    </Text>
                </View>
            )
        } else {


            var meteorArray = Object.keys(this.state.meteors).map(meteordate => {
                return this.state.meteors[meteordate]
            })
            var meteors = [].concat.apply([], meteorArray)
            meteors.forEach(meteor => {
                let diameter = (meteor.estimated_diameter.kilometers.estimated_diameter_min + meteor.estimated_diameter.kilometers.estimated_diameter_max) / 2
                let threatScore = (diameter / meteor.close_approach_data[0].miss_distance.kilometers) * 1000000000
                meteor.threat_score = threatScore


            });

            meteors.sort(function (a, b) {
                return b.threat_score - a.threat_score
            })
            meteors = meteors.slice(0, 5)
            return (
                <View style={styles.container}>
                    <SafeAreaView style={styles.droidSafeArea} />
                    <FlatList
                        data={meteors}
                        renderItem={this.renderItem}
                        keyExtractor={this.keyExtractor}
                        horizontal={true}
                    />
                </View>
            )
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    titleBar: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    meteorContainer: {
        flex: 0.85
    },
    listContainer: {
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        borderRadius: 10,
        padding: 10
    },
    cardTitle: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "bold",
        color: "white",
        marginTop: 400,
        marginLeft: 50
    },
    cardText: {
        color: "white",
        marginTop: 5,
        marginLeft:50,
    },
    threatDetector: {
        height: 10,
        marginBottom: 10
    },
    gifContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    meteorDataContainer: {
        justifyContent: "center",
        alignItems: "center",

    }
});