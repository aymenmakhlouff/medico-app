import React, { useState,useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Button } from "react-native-paper";

import { auth,googleProvider, DB, createUserDocument } from '../firebase-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogBox} from 'react-native';

export default function UserProfile({ navigation }) {
  LogBox.ignoreAllLogs();

  const [value, setValue] = React.useState(0);
  const [data,setData]=useState({
    email:auth.currentUser.email,
    fullName:"",
    type:"doctor",
    lang:23.24,
    lat:24.24
  })
  
  const [pharmData,setPharmData]=useState({
    email:auth.currentUser.email,
    fullName:"",
    type:"pharmacy",
    lang:23.24,
    lat:24.24
  })

  console.log('this is the logged user ', );
  const checkToken = async()=>{
    try {
      const value = await AsyncStorage.getItem('token')
      const type = await AsyncStorage.getItem('type')

      console.log("token",value);
      console.log("type",type);

    } catch (error) {
      throw error
    }
  }

  useEffect(()=>{
    checkToken()
  },[])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Select your account type</Text>

        <TouchableOpacity onPress={() => navigation.navigate("DocFirstStep",{data:data})}>
    
          <View style={[styles.radio]}>
            <Text style={styles.radioLabel}>Doctor</Text>

            <View style={styles.radioBadge}>
              <Text style={styles.radioBadgeText}></Text>
            </View>

            <Text style={styles.radioDescription}>
              Register as a Doctor so you can Call, Chat and book with client
            </Text>

            <View style={[styles.radioInput]} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("pharmFirstStep",{pharmData:pharmData})}>
          <View style={[styles.radio]}>
            <Text style={styles.radioLabel}>Pharmacy</Text>

            <View style={styles.radioBadge}>
              <Text style={styles.radioBadgeText}></Text>
            </View>

            <Text style={styles.radioDescription}>
              Register as a Pharmacy so you can sell and manage your drugs on
              the app.
            </Text>

            <View style={[styles.radioInput]} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 12,
    alignItems: "center",
  },
  radio: {
    marginTop: 30,
    position: "relative",
    backgroundColor: "#fff",
    marginBottom: 12,
    padding: 16,
    borderRadius: 25,
    alignItems: "flex-start",
    borderWidth: 2,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  radioActive: {
    borderColor: "#007260",
  },
  radioLabel: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1.2,
    color: "#007260",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  radioPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2f2f2f",
    marginBottom: 12,
  },
  radioBadge: {
    backgroundColor: "#007260",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  radioBadgeText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#007260",
  },
  radioDescription: {
    fontSize: 15,
    fontWeight: "500",
    color: "#848a96",
  },
  radioInput: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 24,
    height: 24,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: "#007260",
  },
  radioInputActive: {
    borderWidth: 7,
    borderColor: "#007260",
  },
});
