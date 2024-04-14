import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Alert,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import { auth } from "../firebase-config";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../redux/reviewSlicer";
import { fetchOrders, createOrder } from "../redux/orderSlicer";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { Dimensions } from 'react-native';
import {LogBox} from 'react-native';

const { width, height } = Dimensions.get('window');

const MedicineDetails = ({ route }) => {
  const { medicine } = route.params;
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);
  const [allergies, setAllergies] = useState("");
  const [pregnant, setPregnant] = useState("No");
  const [selectedImage, setSelectedImage] = useState(null);
  const [clients, setClients] = useState("null");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  LogBox.ignoreAllLogs();

  const retrieve = async () => {
    const value = await AsyncStorage.getItem("user");
    if (value !== null) {
      const user = JSON.parse(value);
      setClients(user.id);
      return user;
    } else {
      console.log("No user data in async storage");
      return null;
    }
  };

  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.data);

  useEffect(() => {
    dispatch(fetchOrders());
    requestPermissions();
  }, []);

  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    requestPermissions();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setIsRefreshing(false);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  };

  const selectImage = async () => {
    // try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log("here is the result", result);
  
      if (!result.canceled) {
        delete result.canceled;
  
        let formData = new FormData();
        formData.append("file", {
          uri: result.assets[0].uri,
          type: "image/jpeg",
          name: 'prescription'
        });
        formData.append("upload_preset", "ntdxso9x");
        console.log("this is form data", formData);

    fetch("https://api.cloudinary.com/v1_1/ddsp5aq1k/image/upload",{
            method:"post",
            body:formData
        }).then(res=>res.json()).
        then(data=>{
            setSelectedImage(data.url)
            console.log('this is the image url', data)
            // setModal(false)
        }).catch(err=>{
            Alert.alert("error while uploading")
            console.log(err)
        })
  }
    }
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const placeOrder = async () => {
    const email = auth.currentUser.email;
    setIsPlacingOrder(true);

    function generateTrackingNumber(length) {
      let result = "";
      let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }

    try {
      const orderData = {
        quantityOrdered: quantity,
        pregnant: pregnant,
        allergies: allergies,
        prescription: selectedImage,
        total: medicine.price * quantity,
        tracking_number: generateTrackingNumber(5),
        ProductId: medicine.id,
        email,
        phoneNumber: phoneNumber,
        address: address,
      };

      dispatch(createOrder(orderData));

      setIsPlacingOrder(false);

      Alert.alert("Order Placed", "Your order has been successfully placed!");
      toggleModal();
    } catch (error) {
      console.error("Error placing order:", error);

      setIsPlacingOrder(false);
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={25} color="grey" />
        </TouchableOpacity>
        <Text style={styles.detailsText}>Details</Text>
        <View style={styles.icons}>
          <TouchableOpacity>
            <View style={styles.iconContainer}>
              <Icon name="bell-o" size={25} color="grey" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="cart-outline"
                size={25}
                color="grey"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.container}>
          <LinearGradient
            colors={["transparent", "rgba(0, 0, 0, 0.3)"]} 
            style={styles.imageContainer}
          >
            <Image source={{ uri: medicine.imageURL }} style={styles.image} />
          </LinearGradient>
          <View style={{ borderBottomWidth: 1, borderBottomColor: 'grey', paddingBottom: 10 }}>
  <Text style={styles.name}>{medicine.productName}</Text>
</View>
<View style={{ borderBottomWidth: 1, borderBottomColor: 'grey', paddingBottom: 10 }}>
  <Text style={styles.info}>Strength: {medicine.strength}</Text>
</View>
<View style={{ borderBottomWidth: 1, borderBottomColor: 'grey', paddingBottom: 10 }}>
  <Text style={styles.info}>Manufacturer: {medicine.manufacturer}</Text>
</View>
<View style={{ borderBottomWidth: 1, borderBottomColor: 'grey', paddingBottom: 10 }}>
  <Text style={styles.info}>Packaging: {medicine.packaging}</Text>
</View>
<View style={{ borderBottomWidth: 1, borderBottomColor: 'grey', paddingBottom: 10 }}>
  <Text style={styles.info}>Description: {medicine.description}</Text>
</View>
<View style={{ borderBottomWidth: 1, borderBottomColor: 'grey', paddingBottom: 10 }}>
            <Text style={styles.info}>Price : {medicine.price} TND</Text>
          </View>
          <View style={styles.priceAndQuantityContainer}>
          <Text style={styles.subtotal}>
            Sub total : {medicine.price * quantity} TND
          </Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={decrementQuantity}>
                <View style={styles.minusButton}>
                  <Text style={styles.quantityChange}>-</Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity onPress={incrementQuantity}>
                <View style={styles.plusButton}>
                  <Text style={styles.quantityChange}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
            </View>
        </View>
      </ScrollView>
      
        <TouchableOpacity style={styles.buyNowButton} onPress={toggleModal}>
          <Text style={styles.buyNowText}>Place order</Text>
        </TouchableOpacity>
      
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalQuestion}>
            Do you have allergies to medications, food, a vaccine component, or
            latex?
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={setAllergies}
            value={allergies}
            placeholder="Type your allergies here"
          />

          <Text style={styles.modalQuestion}>Are you pregnant?</Text>
          <View style={styles.modalOptions}>
            <TouchableOpacity
              style={[
                styles.modalOption,
                pregnant === "yes" && styles.selectedOption2,
              ]}
              onPress={() => setPregnant("yes")}
            >
              <Text style={pregnant === "yes" && styles.selectedOptionText}>
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modalOption,
                pregnant === "no" && styles.selectedOption2,
              ]}
              onPress={() => setPregnant("no")}
            >
              <Text style={pregnant === "no" && styles.selectedOptionText}>
                No
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.modalQuestion}>Please upload prescription:</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={selectImage}>
            <Text style={styles.uploadButtonText}>Upload Image</Text>
          </TouchableOpacity>
          {selectedImage && (
            <View style={styles.selectedImageContainer}>
              <Image
                source={{ uri: selectedImage }}
                style={styles.selectedImage}
              />
            </View>
          )}
          <Text style={styles.modalQuestion}>Please insert your address:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setAddress}
            value={address}
            placeholder="Type your address here"
          />
          <Text style={styles.modalQuestion}>
            Please insert your phone number:
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            placeholder="+216 XX XXX XXX"
            keyboardType="phone-pad" 
          />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.placeOrderButton}
              onPress={()=>{placeOrder();navigation.navigate("Landing")}}
            >
              <Text style={styles.placeOrderText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: height * 0.05, 
  },
  detailsText: {
    fontWeight: "bold",
    fontSize: width * 0.08,  
    marginLeft: width * 0.03, 
  },
  icons: {
    flexDirection: "row",
    position: "absolute",
    right: width * 0.03, 
  },
  iconContainer: {
    borderWidth: 1,
    borderRadius: width * 0.06, 
    padding: width * 0.02,
    marginRight: width * 0.04, 
    backgroundColor: "#E8E8E8",
    borderColor: "#D3D3D3",
  },
  container: {
    flex: 1,
    padding: width * 0.04, 
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: height * 0.3, 
  },
  name: {
    fontSize: width * 0.05, 
    fontWeight: "bold",
    marginTop: height * 0.02, 
    alignSelf: "flex-start",
  },
  priceAndQuantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: height * 0.02, 
  },
  price: {
    fontSize: width * 0.05, 
    fontWeight: "bold",
  },
  subtotal: {
    fontSize: width * 0.065, 
    marginTop: height * 0.02, 
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: width * 0.03, 
    paddingTop: height * 0.02, 
    paddingBottom: height * 0.02, 
    backgroundColor: "#D3D3D3",
    borderTopLeftRadius: width * 0.06, 
    borderTopRightRadius: width * 0.06, 
  },
  buyNowButton: {
    backgroundColor: "#4CAF50",
    padding: width * 0.04, 
    width: "45%",
    alignItems: "center",
    borderRadius: width * 0.06, 
    alignSelf: "center",
    marginBottom: height * 0.02, // Add this line
  },
  buyNowText: {
    color: "white",
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  minusButton: {
    backgroundColor: "lightgray",
    borderRadius: width * 0.08, 
    width: width * 0.08, 
    height: width * 0.08, 
    justifyContent: "center",
    alignItems: "center",
    marginRight: width * 0.03, 
  },
  plusButton: {
    backgroundColor: "#4CAF50",
    borderRadius: width * 0.08, 
    width: width * 0.08, 
    height: width * 0.08, 
    justifyContent: "center",
    alignItems: "center",
    marginLeft: width * 0.03, 
  },
  quantityChange: {
    fontSize: width * 0.05, 
    color: "white",
  },
  quantity: {
    fontSize: width * 0.07, 
  },
  contraindicationsTitle: {
    fontSize: width * 0.06, 
    marginTop: height * 0.05, 
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  contraindication: {
    fontSize: width * 0.04, 
    marginTop: height * 0.01, 
    alignSelf: "flex-start",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: width * 0.05, 
    borderRadius: width * 0.03, 
  },

  modalOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height * 0.01, 
  },
  uploadButton: {
    backgroundColor: "#4CAF50",
    padding: width * 0.03, 
    width: "45%", 
    alignItems: "center",
    borderRadius: width * 0.05, 
    marginTop: height * 0.01, 
    marginBottom: height * 0.01, 
  },
  uploadButtonText: {
    color: "white",
  },
  selectedImage: {
    width: width * 0.25, 
    height: height * 0.15, 
    marginTop: height * 0.01, 
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height * 0.02, 
  },
  placeOrderButton: {
    backgroundColor: "#4CAF50",
    padding: width * 0.03, 
    width: "45%", 
    alignItems: "center",
    borderRadius: width * 0.05, 
  },
  placeOrderText: {
    color: "white",
  },
  closeButton: {
    backgroundColor: "#bebebe",
    padding: width * 0.03, 
    width: "45%", 
    alignItems: "center",
    borderRadius: width * 0.05, 
  },
  closeText: {
    color: "white",
  },
  modalQuestion: {
    fontWeight: "bold",
    display: "flex",
    flexWrap: "wrap",
  },
  modalOption: {
    padding: width * 0.03, 
    borderRadius: width * 0.05, 
    marginRight: width * 0.03, 
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#4CAF50",
    color: "white",
  },
  selectedOptionText: {
    color: "white",
  },
  selectedOption2: {
    backgroundColor: "#4CAF50",
    color: "white",
  },
  info: {
    fontWeight: "bold",
    fontSize: width * 0.04, 
    marginTop: height * 0.01, 
    alignSelf: "flex-start",
  },
  imageContainer: {
    width: "100%", 
    height: height * 0.25, 
    resizeMode: 'contain',
  },
  image: {
    width: "100%", 
    height: "100%", 
    resizeMode: 'contain',
  },
  input: {
    height: height * 0.06, 
    margin: width * 0.03, 
    marginLeft: -width * 0.005, 
    marginRight: -width * 0.005, 
    borderWidth: 1, 
    borderRadius: width * 0.05, 
    padding: width * 0.025, 
    paddingLeft: width * 0.0375, 
  },
});
export default MedicineDetails;