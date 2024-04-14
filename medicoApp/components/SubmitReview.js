import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import StarRating from 'react-native-star-rating';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import { createReview } from '../redux/reviewSlicer';
import {LogBox} from 'react-native';

const ReviewInput = ({ productId }) => {
  LogBox.ignoreAllLogs();

  const [reviews, setReviews] = useState('');
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch(); // Get the dispatch function

  // Get the user's ID from the Redux state
  const userId = useSelector(state => state.user.id);

  const submitReview = () => {
    // Create the review data
    const reviewData = {
      review: reviews,
      rating: rating,
      UserId: userId, // Include the user's ID
      ProductId: productId,
      // Add other fields as needed
    };

    // Dispatch the createReview action with the review data
    dispatch(createReview(reviewData));
  };


  return (
    <View style={styles.reviewInputCard}>
      <TextInput
        style={styles.reviewInput}
        placeholder="Write a review..."
        value={reviews}
        onChangeText={setReviews}
      />
    <StarRating
  disabled={false}
  maxStars={5}
  rating={rating}
  selectedStar={setRating}
  fullStarColor="gold"
  starSize={20}
  buttonStyle={{marginHorizontal: 20}}
  halfStarEnabled={true} // Add this line
/>
      <TouchableOpacity style={styles.submitButton} onPress={submitReview}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewInputCard: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    marginVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    alignSelf: 'center',
  },
  reviewInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    paddingLeft: 10,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ReviewInput;