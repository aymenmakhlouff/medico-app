import { View, Text, Pressable, Image, Dimensions } from "react-native";
import React from "react";
import COLORS from "../constants/colors";
import Button from "../components/Button";
import NavigationBar from "../components/NavigationBar";
import {LogBox} from 'react-native';

const { width, height } = Dimensions.get("window");

const Welcome = ({ navigation ,route}) => {
  LogBox.ignoreAllLogs();

  const {pharmData}= route.params
  return (
    <View style={{ flex: 1 }}>
      <View>
        <Image
          source={require("../assets/pharm.webp")}
          style={{
            height: height * 0.3,
            width: width * 0.4,
            borderRadius: 10,
            transform: [{ translateX: 120 }, { translateY: 120 }],
          }}
        />
      </View>

      <View
        style={{
          paddingHorizontal: 22,
          transform: [{ translateX: -5 }, { translateY: 180 }],
        }}
      >
        <Text
          style={{
            fontSize: 50,
            fontWeight: 800,
            color: COLORS.black,
          }}
        >
          Let's Get
        </Text>
        <Text
          style={{
            fontSize: 46,
            fontWeight: 800,
            color: COLORS.primary,
          }}
        >
          Started
        </Text>

        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 16,
              color: COLORS.black,
              marginVertical: 4,
            }}
          >
            Connect with your Pharmacies
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: COLORS.black,
            }}
          >
            Sell,Call, Chat and book with client
          </Text>
        </View>

        <Button
          title="Upgrade Now"
          onPress={() => navigation.navigate("PharmFirstForm" , {pharmData:pharmData})}
          style={{
            marginTop: 22,
            width: "100%",
          }}
        />

        <View
          style={{
            flexDirection: "row",
            marginTop: 12,
            justifyContent: "center",
          }}
        ></View>
      </View>
    </View>
  );
};

export default Welcome;
