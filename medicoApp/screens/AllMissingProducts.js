import { StyleSheet, Text, View,ScrollView,SafeAreaView,TouchableOpacity,Image,TextInput,FlatList,Dimensions } from 'react-native'
import React,{useState,useEffect} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import PharmacyCard from '../components/PharmacyCard';
// import NavigationBar from '../components/NavigationBar';
// import PharmacyCardProfile from '../components/PharmacyCardProfile';
import MedicineCard from '../components/MedicineCard';
import {LogBox} from 'react-native';


const {width,height} = Dimensions.get('window')


const AllMissingProducts = ({navigation}) => {
  LogBox.ignoreAllLogs();


  const medicines = [
    {
      name: "Doliprane 1000",
      image:
        "https://www.med.tn/image-medicament-9816dd007411506ab2ce1249e99d2c8c.jpg",
      price: 10,
      contraindications: [
        "Allergie au paracétamol",
        "Insuffisance hépatique",
        "Grossesse",
        "Allaitement",
      ],
    },
    {
      name: "Gripex",
      image:
        "https://galpharma.tn/wp-content/uploads/2019/09/Gripex-Adulte-12.jpg",
      price: 10,
      contraindications: [
        "Allergie au paracétamol",
        "Insuffisance hépatique",
        "Grossesse",
        "Allaitement",
      ],
    },
    {
      name: "Analgin 500mg",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2022/1/BN/EZ/DT/95289/analgin.jpg",
      price: 10,
      contraindications: [
        "Allergie au paracétamol",
        "Insuffisance hépatique",
        "Grossesse",
        "Allaitement",
      ],
    },
    {
      name: "Efferalgan 500mg",
      image:
        "https://www.famacie.com/web/image/product.template/985/image_1024?unique=561b0e2",
      price: 10,
      contraindications: [
        "Allergie au paracétamol",
        "Insuffisance hépatique",
        "Grossesse",
        "Allaitement",
      ],
    },
    {
      name: "Aspirine 500mg",
      image:
        "https://cdn1.apopixx.de/500/web_schraeg_png/10203626.png?ver=1649058520",
      price: 10,
      contraindications: [
        "Allergie au paracétamol",
        "Insuffisance hépatique",
        "Grossesse",
        "Allaitement",
      ],
    },
    // Add more medicines here...
  ];
  const [search, setSearch] = useState("");
  const [filteredMedicines, setFilteredMedicines] = useState([]);

  useEffect(() => {
    setFilteredMedicines(
      medicines.filter((medicine) =>
        medicine.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  return (
    <View>
      <SafeAreaView>
      <View style={styles.header}>
            <Text style={styles.pharmaciesText}>Foulen's Pharmacy missing products</Text>
            <View style={styles.icons}>
                <TouchableOpacity>
                    <View style={styles.iconContainer}>
                        <Icon name="bell-o" size={25} color="grey" style={styles.icons} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name="cart-outline" size={25} color="grey" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.searchContainer}>
            <Image source={require('../assets/lense.png')} style={styles.searchIcon} />
            <TextInput
                style={styles.searchBar}
                placeholder="Search..."
                onChangeText={text => setSearch(text)}
                value={search}
                />
        </View>

        <ScrollView style={{height:height*0.80}}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {filteredMedicines.map((medicine, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate("MedicineDetails", { medicine })
              }
            >
              <MedicineCard medicine={medicine} />
            </TouchableOpacity>
          ))}
            </View>
            <View style={{ height: 40 }} />
        </ScrollView>

      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 50,
    },
    pharmaciesText: {
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 20, // Add this line
      },
    icons: {
      flexDirection: 'row',
    },
    iconContainer: {
      borderWidth: 1,
      borderRadius: 50,
      padding: 7,
      marginRight: 10,
      backgroundColor: '#E8E8E8',
      borderColor: '#D3D3D3', // Add this line
    },
  ordersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 55,
  },
  card: {
    borderRadius: 30,
    padding: 19,
    backgroundColor: '#f8f8f8',
    marginTop: 30,
    marginHorizontal: 10,
    height: 150,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchBar: {
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#E8E8E8',
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    borderRadius: 20,
    marginTop: 40, // Increase this value
    marginLeft: 30,
    marginRight: 30,
    marginBottom:10
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  searchBar: {
    flex: 1,
    padding: 10, // Reduce this value
  },
  ordersText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  secondOrdersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    paddingLeft:7,
    paddingRight:7
  },
  button: {
    backgroundColor: '#ddf0ee',
    borderRadius: 20,
    paddingVertical: 3.5,
    paddingHorizontal: 13,  
  },
  buttonText: {
    color: '#2d958c',
    fontSize: 15,
  },
});

export default AllMissingProducts

