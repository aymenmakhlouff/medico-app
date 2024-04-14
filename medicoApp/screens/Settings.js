import { StyleSheet, Text, View,ScrollView,Dimensions,TextInput,KeyboardAvoidingView,Image } from 'react-native'
import React, { useState } from 'react'
const { width, height } = Dimensions.get('window');
import COLORS from '../constants/colors';
import Button from '../components/Button';
import {auth,updateUserDocument,updateUserSettings,updateEmailOnly} from '../firebase-config'
import { useNavigation } from '@react-navigation/native';
import {LogBox} from 'react-native';

const Settings = ({route}) => {
    LogBox.ignoreAllLogs();


    
    const navigation=useNavigation()


    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  


    const handleUpdateUserSettings = async () => {
        // Assuming you have the user object and additional data
        const user = auth.currentUser// Get the user object as needed
        const additionalData = {
          name: name,
          // Add other fields you want to update
        };
      
        // Call the function to update user data
        const updated =await updateUserDocument(user,additionalData);
        navigation.navigate('Landing',updated)
      };




    const handleSubmit = (e)=>{
        e.preventDefault()
    }

  return (
      <KeyboardAvoidingView style={{flex:1,
        justifyContent:'center',
        alignItems:'center'}}>
    <ScrollView contentContainerStyle={{flexGrow:1,
    justifyContent:'center',
    gap:30,
    alignItems:'center'}}>
        <Text
        style={{fontSize:35,
        fontWeight:600}}
        >Pesonal Details</Text>

                        <Image
                            source={require("../assets/hero1.png")}
                            style={{
                                height: height*0.15,
                                width: width*0.35,
                            }}
                        />

        <View>
          <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Edit your email :</Text>

                    <View style={{
                        width: width*0.89,
                        height: height*0.06,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Edit your email'
                            placeholderTextColor={COLORS.black}
                            // keyboardType='email-address'
                            style={{
                                width: "100%"
                            }}
                            // onChangeText={(text)=>{setEmail(text)}}
                            onSubmit={handleSubmit}
                        />
                    </View>
                </View>
        
          <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Edit your name :</Text>

                    <View style={{
                        width: width*0.89,
                        height: height*0.06,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Edit your name'
                            placeholderTextColor={COLORS.black}
                            // keyboardType='email-address'
                            style={{
                                width: "100%"
                            }}
                            onChangeText={(text)=>{setName(text)}}
                            onSubmit={handleSubmit}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Current password :</Text>

                    <View style={{
                        width: width*0.89,
                        height: height*0.06,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Curre,t password'
                            placeholderTextColor={COLORS.black}
                            // keyboardType='email-address'
                            style={{
                                width: "100%"
                            }}
                            // onChangeText={(text)=>{setCurrentPassword(text)}}
                            onSubmit={handleSubmit}
                        />
                    </View>
                </View>







                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Change password :</Text>

                    <View style={{
                        width: width*0.89,
                        height: height*0.06,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Change password'
                            placeholderTextColor={COLORS.black}
                            // keyboardType='email-address'
                            style={{
                                width: "100%"
                            }}
                            // onChangeText={(text)=>{setNewPassword(text)}}
                            onSubmit={handleSubmit}
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Confirm your password :</Text>

                    <View style={{
                        width: width*0.89,
                        height: height*0.06,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Confirm Password'
                            placeholderTextColor={COLORS.black}
                            style={{
                                width: "100%"
                            }}
                            // onChangeText={(text)=>{setConfirmPassword(text)}}
                            onSubmit={handleSubmit}
                        />
                    </View>
                </View>
                    </View>
                <Button
                onPress={()=>{
                    handleUpdateUserSettings()
                  
                }}

              titleStyle={{
                color: "#FFFFFF"
             }}
            title="Submit"
            filled
            style={{
                            width: width*0.89,
                            backgroundColor: COLORS.primary,
                            color: COLORS.white
                        }}
                    />
      
    </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Settings