import {
    View,
    Text,
    Image,
    Pressable,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Alert,
    KeyboardAvoidingView,
  } from 'react-native';
  import {LogBox} from 'react-native';

  
  import React, { useState, useEffect } from 'react';
  
  import COLORS from '../constants/colors';
  
  import { Ionicons } from '@expo/vector-icons';
  
  import Checkbox from 'expo-checkbox';
  
  import Button from '../components/Button';
  
  import { auth,googleProvider } from '../firebase-config';
  
  import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
  
  const { width, height } = Dimensions.get('window');

  import { useSelector, useDispatch,Provider } from 'react-redux';

  import { addUser,fetchUsers } from '../redux/userSlicer';

  import store from '../redux/store'



const Signup = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [number,setNumber] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const user= useSelector((state) => state.user.data);
    console.log("this is the user",user);
    LogBox.ignoreAllLogs();


    useEffect(()=>{
        dispatch(fetchUsers())
    },[])

    const handleSignUp = async () => {
        if (!email || !password || !number) {
          console.log('Please provide an email, phone number, and password.');
          return;
        }
      
        try {
          // Create a user in Firebase Authentication
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
          // Get the user object from the userCredential
          const userLogged = userCredential.user;
      
          // Save user data to Firestore including the phone number
          dispatch(addUser({
            email:userLogged.email , 
            username:"foulen",
            password:password,
            type:"user",
          }));

          // Redirect to the landing page after successful signup
          
          navigation.navigate('Login')
        } catch (error) {
          console.error('Error during signup:', error);
        }
      };
      

    const handleSubmit = (e)=>{
        e.preventDefault()
    }


    const withGoogle = async()=>{
        try {
            
         const logged= await signInWithPopup(auth , googleProvider)
         console.log(logged);
        } catch (error) {
          alert(error);
        }
      }

 


    return (
            
            <KeyboardAvoidingView style={{ flex: 1, marginHorizontal: 22 }}
            behavior='padding'>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: COLORS.black
                    }}>
                        Create Account
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: COLORS.black
                    }}>Connect to get your medicine easily now!</Text>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Email address</Text>

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
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={{
                                width: "100%"
                            }}
                            onChangeText={(text)=>{setEmail(text)}}
                            onSubmit={handleSubmit}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Mobile Number</Text>

                    <View style={{
                        width: width*0.89,
                        height: height*0.06,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='+216'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            style={{
                                width: width*0.1,
                                borderRightWidth: 1,
                                borderLeftColor: COLORS.grey,
                                height: height*0.06
                            }}
                        />

                        <TextInput
                            placeholder='Enter your phone number'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            style={{
                                width: width*0.7
                            }}
                            onChangeText={(text)=>setNumber(text)}
                            onSubmit={handleSubmit}

                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Password</Text>

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
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: width*0.85
                                
                            }}
                            onChangeText={(text)=>{setPassword(text)}}
                            onSubmit={handleSubmit}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.primary : undefined}
                    />

                    <Text>I agree to the terms and conditions</Text>
                </View>

                <Button 
                    
                    title="Sign Up"
                    filled
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                    onPress={handleSignUp}
                    
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: height*0.065,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >

                    
                        <Image
                            source={require("../assets/facebook.png")}
                            style={{
                                height: height*0.5,
                                width: width*0.08,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        // onPress={}
                        // onPress={()=>signInWithGoogle()}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: height*0.065   ,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../assets/google.png")}
                            style={{
                              height: height*0.5,
                              width: width*0.08,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Google</Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account</Text>
                    <Pressable
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Login</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
         
        
    )
}

export default Signup