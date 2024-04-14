import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View,Dimensions,TextInput,Image} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import React,{useState} from 'react'
const { width, height } = Dimensions.get('window');
import COLORS from '../constants/colors';
import {auth,updateUserDocument} from '../firebase-config'
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import {LogBox} from 'react-native';





const FinishSignUp = ({route}) => {




    const navigation=useNavigation()



    // const userLogged=route.params.userInfo
    const [isOpen,setIsOpen]=useState(false)
    const [name,setName]=useState('')
  
    const [gender,setGender]=useState(null)



    LogBox.ignoreAllLogs();



    const genderOptions = ['Select Gender', 'Male', 'Female', 'Other'];

    





    // const handleUpdateUserInfo = async () => {
    //     // Assuming you have the user object and additional data
    //     const user = auth.currentUser// Get the user object as needed
    //     const additionalData = {
    //       name: name,
    //       gender: gender,
    //       // Add other fields you want to update
    //     };
      
    //     // Call the function to update user data
    //     const updated =await updateUserDocument(user, additionalData);
    //     navigation.navigate('Landing')
    //   };

      const handleUpdateUserInfo = async()=>{
        try {
          const email = auth.currentUser.email;
          const response = await axios.put( `http://${
            process.env.EXPO_PUBLIC_SERVER_IP
          }:1128/api/user/updateNamee/${email}`,{name:name})
          navigation.navigate('Landing')
        } catch (error) {
          throw new Error(error)
        }
      }


      const handleSubmit = (e)=>{
        e.preventDefault()
    }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
    <KeyboardAvoidingView style={{ flex : 1,
        height:height*0.5,
        width:width*1,
        justifyContent:"center",
        alignItems:"center",
        gap:80
        }}>
        <View style={{alignItems:'center',
        display:"flex",
        justifyContent:"center",
        gap:30
        }}>
        
            <View>
            <Text style={{

                display:'flex',
                textAlign:'center',
                fontSize: 25,
                fontWeight: 800,
                color: COLORS.black,

                }}>Finish setting up your profile!</Text>
                            
                            </View>
                    
                    <Image
                        source={require("../assets/firststep.png")}
                        style={{
                            height: height*0.35,
                            width: width*0.7,
                            borderRadius: 10,
                        }}
                    />

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Enter you name :</Text>

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
                            placeholder='Enter your name'
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
                <View style={{width:width*0.90,
                gap:10}}>
                    <Text>Enter Your gender :</Text>
                        <DropDownPicker
                         items={genderOptions.map((gender) => ({
                         label: gender,
                        value: gender,
                         }))}
                         open={isOpen}
                         value={gender}
                         setOpen={() => setIsOpen(!isOpen)}
                         setValue={(value) => setGender(value)}
                         onSubmit={handleSubmit}
                         />

                </View>

            </View>
            <Button
              titleStyle={{
                color: "#FFFFFF"
             }}
            title="Submit"
            filled
            onPress={handleUpdateUserInfo}
            style={{
                            width: width*0.85,
                            backgroundColor: COLORS.primary,
                            color: COLORS.white
                        }}
                    />

        </KeyboardAvoidingView>
        </ScrollView>
    // <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
    //         <View >
            


    //             <KeyboardAvoidingView>
    //             <View style={{ marginBottom: 12,
    //              }}>
    //                 <Text style={{
    //                     fontSize: 16,
    //                     fontWeight: 400,
    //                     marginVertical: 8
    //                 }}>Email address</Text>

    //                 <View style={{
    //                     width: width*0.89,
    //                     height: height*0.06,
    //                     borderColor: COLORS.black,
    //                     borderWidth: 1,
    //                     borderRadius: 8,
    //                     alignItems: "center",
    //                     justifyContent: "center",
    //                     paddingLeft: 22
    //                 }}>
    //                     <TextInput
    //                         placeholder='Enter your email address'
    //                         placeholderTextColor={COLORS.black}
    //                         keyboardType='email-address'
    //                         style={{
    //                             width: "100%"
    //                         }}
    //                         onChangeText={(text)=>{setName(text)}}
                            
    //                     />
    //                 </View>
    //             </View>
    //             <View style={{ marginBottom: 12,
    //              }}>
    //                 <Text style={{
    //                     fontSize: 16,
    //                     fontWeight: 400,
    //                     marginVertical: 8
    //                 }}>Gender</Text>

                  
                    
    //                     <DropDownPicker
    //                     items={genderOptions.map((gender) => ({
    //                     label: gender,
    //                     value: gender,
    //                     }))}
    //                     open={isOpen}
    //                     value={currentValue}
    //                     setOpen={() => setIsOpen(!isOpen)}
    //                     setValue={(value) => setCurrentValue(value)}
    //                     onChangeText={(text)=>setGender(text)}
    //                     />
                    
    //             </View>

    //             </KeyboardAvoidingView>





    //         </View>
    //         <Button
    //           titleStyle={{
    //             color: "#FFFFFF"
    //          }}
    //         title="Continue"
    //         filled
    //         onPress={handleUpdateUserInfo}
    //         style={{
    //                         width: width*0.85,
    //                         backgroundColor: COLORS.primary,
    //                         color: COLORS.white
    //                     }}
    //                 />
    //    </ScrollView>
  )
}

export default FinishSignUp

