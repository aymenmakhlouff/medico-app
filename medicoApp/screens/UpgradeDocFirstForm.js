import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
  Image
} from "react-native";
import Button from "../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const { width,height } = Dimensions.get("window");
import COLORS from "../constants/colors";
import { auth } from "../firebase-config";
import { useSelector, useDispatch } from "react-redux";
import { migrateDoctor, updateSpeciality } from "../redux/doctorSlicer";
import { fetchSpeciality } from "../redux/speciality";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { updateUser,setSelectedImage } from "../redux/userSlicer";
import {docImage} from '../redux/doctorSlicer'




export default function UpgradeDocFirstForm({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [yoex, setYoex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenType, setIsOpenType] = useState(false);
  const [category, setCategory] = useState(null);
  const [type, setType] = useState(null);
  // const [localSelectedImage , setSelectedImage] = useState("");
  const [mapping,setMapping] = useState([]);
  const [localSelectedImage , setLocalSelectedImage] = useState("")


console.log("=======",category);
  const getSpecialicty = async (idDay) => {
    try {
      const response = await axios.get(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/specialities/getAll`
      );
      setMapping(response.data);
    } catch (error) {
      console.error("Error getting speciality", error);
      throw new Error(error);
    }
  };

  // const mapping = useSelector((state) => state.speciality.data );
  // console.log('this is the category',mapping);
  const typeOptions = ["Nurse", "Doctor"];

  const dispatch = useDispatch();

//   const selectImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: false,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       let formData = new FormData();
//       formData.append('file', {
//         uri: result.uri,
//         type: "image/jpeg",
//         name: 'profilePic'
//       });
//       formData.append("upload_preset", "ntdxso9x");
  
//       fetch("https://api.cloudinary.com/v1_1/ddsp5aq1k/image/upload", {
//       method: "POST",
//       body: formData
//     })
//     .then(response => response.json())
//     .then(data => {
//       setSelectedImage(data.secure_url);
//       dispatch(setSelectedImage(data.secure_url));

//       dispatch(docImage(uid));
//       console.log(uid);
//     })
//     .catch(error => {
//       console.error("Error uploading image: ", error);
//     });
//   }
// };

const updateImg = async ()=>{
try {
  const email = auth.currentUser.email
  const x = await axios.put( `http://${
    process.env.EXPO_PUBLIC_SERVER_IP
  }:1128/api/doctor/updtImgDoc/${email}`,{img:localSelectedImage})
} catch (error) {
  throw new Error(error)
}
}


const selectImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    let formData = new FormData();
    formData.append('file', {
      uri: result.uri,
      type: "image/jpeg",
      name: 'profilePic'
    });
    formData.append("upload_preset", "ntdxso9x");

    fetch("https://api.cloudinary.com/v1_1/ddsp5aq1k/image/upload", {
    method: "POST",
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    setLocalSelectedImage(data.secure_url);
    // dispatch(setSelectedImage(data.secure_url));
    // dispatch(updateUser(localSelectedImage));
    // updateImg(localSelectedImage)
    // setRefresh(!refresh)

  })
  .catch(error => {
    console.error("Error uploading image: ", error);
  });
}
};


  useEffect(() => {
    getSpecialicty()


   
  }, []);
  
  console.log('eeeeeeeeeeeeeeeeee' , category);

  const docMigration = async () => {
    const email = auth.currentUser.email;
    const obj = {
      fullname: fullName,
      type: type,
      age: age,
      email: email,
      yx: yoex,
      specialityId: category

    };
   


    dispatch(migrateDoctor(obj));
    navigation.navigate("map");
    await AsyncStorage.setItem("type", "doctor");
  };

 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F4EFF3" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
        </View>

        <KeyboardAwareScrollView>
        
          <View style={styles.form}>
            <View style={{
              alignItems:'center'
            }}>
              <View
          style={{
            width: 150,
            height: 150,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
            shadowColor: "rgba(3, 3, 3, 0.1)",
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            backgroundColor: "#EAEAEA",
            position: "relative",
          }}
        >
          {localSelectedImage ? (
  <Image 
    source={{uri: localSelectedImage}}
    style={{
      width: 150,
      height: 150,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 100,
      shadowColor: "rgba(3, 3, 3, 0.1)",
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      backgroundColor: "#EAEAEA",
    }}
  />
) : null}
          <TouchableOpacity 
          onPress={selectImage}
            style={{
              position: "absolute",
              width: 150,
              top: 15,
              left: 110,
              width: 35,
              height: 35,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
              shadowColor: "rgba(3, 3, 3, 0.1)",
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 4,
              backgroundColor: "#1a998e",
              borderWidth: 3.5,
              borderColor: "white",
              borderStyle: "solid",
            }}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../assets/editPen.png")}
            />
          </TouchableOpacity>
        </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Full Name</Text>

              <TextInput
                value={fullName}
                onChangeText={(e) => {
                  setFullName(e);
                }}
                style={styles.inputControl}
              />
            </View>
            <View style={{ width: width * 0.9, gap: 10, zIndex: 1, paddingBottom: 20 }}>
              <Text>Enter Your Category :</Text>
              <DropDownPicker
                items={typeOptions.map((category) => ({
                  label: category,
                  value: category,
                }))}
                open={isOpenType}
                value={type}
                setOpen={() => setIsOpenType(!isOpenType)}
                setValue={(value) => setType(value)}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Age</Text>

              <TextInput
                value={age}
                onChangeText={(e) => {
                  setAge(e);
                }}
                style={styles.inputControl}
              />
            </View>
            <View style={{ width: width * 0.9, gap: 10, zIndex: 2, paddingBottom: 20 }}>
              <Text>Enter Your speciality :</Text>
              <DropDownPicker
                items={mapping.map((category) => ({
                  label: category.name,
                  value: category.id,
                }))}
                open={isOpen}
                value={category}
                setOpen={() => setIsOpen(!isOpen)}
                setValue={(value) => setCategory(value)}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                // onPress={() => updateSpeciality(category)}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Years Of Experience</Text>

              <TextInput
                value={yoex}
                onChangeText={(e) => {
                  setYoex(e);
                }}
                style={styles.inputControl}
              />
            </View>
            </View>

            <View style={styles.formAction}>
              <Button
                onPress={() => {docMigration();updateImg()}}
                titleStyle={{
                  color: "#FFFFFF",
                }}
                title="Continue"
                filled
                style={{
                  width: width * 0.85,
                  backgroundColor: COLORS.primary,
                  color: COLORS.white,
                }}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    paddingHorizontal: 24,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffdada",
    marginBottom: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#181818",
    marginBottom: 36,
  },
  form: {
    paddingHorizontal: 24,
  },
  formAction: {
    marginVertical: 24,
    zIndex: 0,
    alignItems:'center'
  },
  formFooter: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "400",
    color: "#9fa5af",
    textAlign: "center",
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1c1c1e",
    marginBottom: 6,
  },
  inputControl: {
    height: 44,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#24262e",
    borderWidth:1,
    width:width*0.9
  },
  btnText: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  input: {
    marginBottom: 16,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    backgroundColor: "#FD6B68",
    borderColor: "#FD6B68",
  },
});