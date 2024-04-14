import { View, Text, Pressable, Image, Dimensions } from 'react-native'
import React from 'react'
// import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../constants/colors';
import Button from '../components/Button';
import NavigationBar from '../components/NavigationBar';
// import LottieView from 'lottie-react-native';
const { width, height } = Dimensions.get("window");
import {LogBox} from 'react-native';


const Welcome = ({ navigation }) => {
    LogBox.ignoreAllLogs();

    return (

            <View style={{ flex: 1 }}> 
                <View>
                  {/* <LottieView
                  source={require('../components/animatedlogo.json')}
                  autoPlay
                  loop
                  /> */}

                     <Image
                        source={require("../assets/rocket.png")}
                        style={{
                            height: height*0.25,
                            width: width*0.4,
                            borderRadius: 10,
                            transform: [
                                { translateX: 120 },
                                { translateY: 120 },
                                // { rotate: "12deg" }
                            ]
                        }}
                    /> 
                </View>

                {/* content  */}

                <View style={{
                    paddingHorizontal: 22,
                    // position: "absolute",
                    // top: 400,
                    // width: "100%"
                    transform: [
                      { translateX: -5 },
                      { translateY: 180 },
                      // { rotate: "12deg" }
                  ]
                }}>
                    <Text style={{
                        fontSize: 50,
                        fontWeight: 800,
                        color: COLORS.black
                    }}>Let's Get</Text>
                    <Text style={{
                        fontSize: 46,
                        fontWeight: 800,
                        color: COLORS.primary,
                    }}>Started</Text>

                    <View style={{ marginVertical: 22 }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.black,
                            marginVertical: 4
                        }}>Connect with your pharmacy or doctor</Text>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.black,
                        }}>Call, Chat and book your medicines</Text>
                    </View>

                    <Button
                        title="Join Now"
                        onPress={() => navigation.navigate("Signup")}
                        style={{
                            marginTop: 22,
                            width: "100%"
                        }}
                    />

                    <View style={{
                        flexDirection: "row",
                        marginTop: 12,
                        justifyContent: "center"
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.black
                        }}>Already have an account ?</Text>
                        <Pressable
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.primary ,
                                fontWeight: "bold",
                                marginLeft: 4
                            }}>Login</Text>
                        </Pressable>

                    </View>
                </View>
                
            </View>
        
    )
}

export default Welcome