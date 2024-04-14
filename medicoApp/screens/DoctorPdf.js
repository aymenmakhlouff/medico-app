import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome from 'react-native-vector-icons'
import Button from "../components/Button";
import COLORS from "../constants/colors";
import * as DocumentPicker from "expo-document-picker";
import { updateRecords } from "../redux/doctorSlicer";
import { auth } from "../firebase-config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateRecordsPharm } from "../redux/pharmacySlicer";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");

const DoctorPdf = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [documents, setDocuments] = useState({ assets: [] });
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      multiple: true,
    });
  
    const totalSelectedDocuments =
      result?.assets?.length + documents?.assets?.length || 0;
  
    if (totalSelectedDocuments > 6) {
      Alert.alert(
        "Limit Exceeded",
        "You can only select up to 6 documents.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } else if (result?.assets) {
      setDocuments((prevDocuments) => ({
        assets: [...prevDocuments.assets, ...result.assets],
      }));
    }
  };
  
  const sendDocuments = async () => {
    const email = auth.currentUser.email;
    const typeLogger = await AsyncStorage.getItem("type");
  
    try {
      const promises = documents.assets.map(async (document) => {
        try {
          const formData = new FormData();
          formData.append("file", {
            uri: document.uri,
            type: document.type || "application/octet-stream",
            name: document.name || "file",
          });
          formData.append("upload_preset", "qyrzp0xv");
  
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/dp42uyqn5/upload`,
            {
              method: "POST",
              body: formData,
              headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
              },
            }
          );
  
          if (!response.ok) {
            throw new Error(`Failed to upload ${document.name}. Status: ${response.status}`);
          }
  
          const responseData = await response.json();
  
          const obj = {
            email,
            type: responseData.format,
            file: responseData.secure_url,
            name: document.name,
          };
  
          if (typeLogger === "pharmacy") {
            dispatch(updateRecordsPharm(obj));
            console.log("updatPharma",obj);
          } else {
            dispatch(updateRecords(obj));
            console.log("updatDoc",obj);

          }
          console.log("updated");

        } catch (uploadError) {
          console.error(`Error uploading ${document.name} to Cloudinary:`, uploadError);
          throw uploadError; // Re-throw the error to handle it in the outer catch block
        }
      });
  
      // Wait for all promises to resolve before navigating or handling the result
      await Promise.all(promises);
  
      // Clear selected documents after successfully sending them
      setDocuments({ assets: [] });
  
      // Navigate to the desired screen
      navigation.navigate("SendingDoc");
    } catch (error) {
      console.error("Error during document upload:", error.message);
      // Handle error, show an alert, etc.
    }
  };
  

  const deleteDocument = (index) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this document?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            const updatedDocuments = [...documents.assets];
            updatedDocuments.splice(index, 1);
            setDocuments({ assets: updatedDocuments });
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    setIsButtonVisible(documents.assets.length > 0);
  }, [documents.assets]);

  useEffect(() => {
    if (documents.assets.length > 0) {
      documents.assets.forEach((asset) => {
        console.log("Selected File:", asset.name);
      });
    }
  }, [documents.assets]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      <Text style={{ fontSize: 40, fontWeight: "800", textAlign: "center" }}>
        Insert Your document(s) please!
      </Text>
      <Image
        source={require("../assets/step3.png")}
        style={{ height: height * 0.3, width: width * 0.9 }}
      />

      <View style={{ gap: 20 }}>
        <Button
          title="Select Document(s)"
          onPress={pickDocument}
          filled
          style={{ width: width * 0.95 }}
        />
        <Button
          title="Send Document(s)"
          style={{ width: width * 0.95 }}
          onPress={()=>{
            sendDocuments()
        navigation.navigate('SendingDoc')
          }
          
          }
        />
        {documents && documents.assets && documents.assets.length > 0 && (
          <FlatList
            data={documents.assets}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10, backgroundColor: COLORS.grey, borderRadius: 10, marginVertical: 5 }}>
                <TouchableOpacity onPress={() => console.log(item.uri)}>
                  <Text>{item.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteDocument(index)}>
                  <FontAwesome name="trash-o" size={20} color={COLORS.red} />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default DoctorPdf;
