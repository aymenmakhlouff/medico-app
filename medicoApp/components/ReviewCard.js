import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {LogBox} from 'react-native';

const ReviewCard = ({ review }) => {
  LogBox.ignoreAllLogs();

    return (
      <View style={styles.reviewCard}>
        <Text style={styles.reviewText}>{review}</Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    reviewCard: {
        backgroundColor: '#f8f8f8',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        alignSelf: 'flex-start', // Add this line
      },
    reviewText: {
      fontSize: 16,
    },
  });

export default ReviewCard