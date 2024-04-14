import { StyleSheet, Text, View,ScrollView,SafeAreaView,TouchableOpacity,Image,TextInput,FlatList,Dimensions } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import PharmacyCard from '../components/PharmacyCard';
// import NavigationBar from '../components/NavigationBar';
import PharmacyCardProfile from '../components/PharmacyCardProfile';
import {LogBox} from 'react-native';

const {width,height} = Dimensions.get('window')


const PharmacyProfile = ({navigation}) => {
  LogBox.ignoreAllLogs();

    const medicines = [
        {
          name: 'Doliprane 1000',
          image: 'https://www.med.tn/image-medicament-9816dd007411506ab2ce1249e99d2c8c.jpg', // Replace with actual image URL
        },
        {
          name: 'Gripex',
          image: 'https://galpharma.tn/wp-content/uploads/2019/09/Gripex-Adulte-12.jpg', // Replace with actual image URL
        },
        
      ];

  return (
    <View style={styles.container}
    >
    <SafeAreaView>
                <ScrollView style={{flexGrow:1,
                height:height*0.8}}>
                    
        <View style={styles.secondOrdersContainer}>
        <Text style={styles.ordersText}>Missing Products</Text>
        <TouchableOpacity style={styles.button}
        onPress={()=>navigation.navigate('AllMissingProducts')}>
          <Text style={styles.buttonText}>SEE ALL</Text>
        </TouchableOpacity>
      </View>
        <FlatList
        data={medicines}
        renderItem={({ item }) => <PharmacyCardProfile pharmacy={item} />}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true} // Make the list horizontal
        />

                <View style={styles.secondOrdersContainer}>
        <Text style={styles.ordersText}>Client's Choice</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>SEE ALL</Text>
        </TouchableOpacity>
      </View>
        <FlatList
        data={medicines}
        renderItem={({ item }) => <PharmacyCardProfile pharmacy={item} />}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true} // Make the list horizontal
        />

    <View style={styles.secondOrdersContainer}>
        <Text style={styles.ordersText}>Promotions</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>SEE ALL</Text>
        </TouchableOpacity>
      </View>
        <FlatList
        data={medicines}
        renderItem={({ item }) => <PharmacyCardProfile pharmacy={item} />}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true} // Make the list horizontal
        />
        
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
        fontSize: 30,
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

export default PharmacyProfile