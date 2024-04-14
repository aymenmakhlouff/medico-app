import React from 'react';
import { View, Text, Modal, StyleSheet, PanResponder, Animated } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import {LogBox} from 'react-native';

const SwipeableModal = ({ visible, onClose, children }) => {
  LogBox.ignoreAllLogs();

  const translateY = new Animated.Value(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const { dx } = gestureState;
      translateY.setValue(dx);
    },
    onPanResponderRelease: (_, gestureState) => {
      const { dx } = gestureState;
      if (dx < -50) {
        // If swiped left (threshold is -50), close the modal
        Animated.timing(translateY, {
          toValue: -300,
          duration: 300,
          useNativeDriver: false,
        }).start(onClose);
      } else {
        // Otherwise, reset the modal to its original position
        Animated.spring(translateY, {
          toValue: 0,
          tension: 10,
          friction: 4,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <Modal transparent visible={visible} animationType="slide">
      <PanGestureHandler {...panResponder.panHandlers}>
        <Animated.View style={[styles.modalContainer, { transform: [{ translateX: translateY }] }]}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default SwipeableModal;
