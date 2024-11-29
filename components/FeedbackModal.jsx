import { View, Text, TextInput, TouchableOpacity, Pressable, Alert, StyleSheet, Modal, Animated, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useOrderFeedbackContext } from '../context/OrderFeedbackContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

const FeedbackModal = () => {

  const [feedback, setFeedback] = useState('');
  const [raiseIssue, setRaiseIssue] = useState(false);
  const [isFormvalid, setIsFormvalid] = useState(false);
  const [issueDescription, setIssueDescription] = useState('');
  const { isModal, setIsModal, orderID } = useOrderFeedbackContext();
  const [image, setImage] = useState(null);

  // Animation setup for modal slide effect
  const slideAnim = useState(new Animated.Value(300))[0]; // Initial position (below screen)

  useEffect(() => {
    if (isModal) {
      // Slide modal in from the bottom when it's visible
      Animated.spring(slideAnim, {
        toValue: 0, // Position it at the bottom of the screen
        friction: 7,
        tension: 100,
        useNativeDriver: true,
      }).start();
    } else {
      // Slide out when modal is closed
      Animated.spring(slideAnim, {
        toValue: 300, // Position it below the screen
        friction: 7,
        tension: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [isModal]);

  const handleFeedbackSubmit = () => {
    if (raiseIssue) {
      if (!issueDescription) {
        Alert.alert('Warning', 'Issue Description is required', [
          { text: 'OK', style: 'destructive' }
        ]);
        return; // Exit function early
      }
      setRaiseIssue(false); // Close issue form
    }

    if (feedback.length === 0) {
      Alert.alert('Warning', 'Feedback Description is required', [
        { text: 'OK', style: 'destructive' }
      ]);
      return; // Exit function early
    }

    // If both conditions pass, the form is valid
    setIsFormvalid(true);

    if (isFormvalid) {
      // Submit data
      console.log('Form submitted successfully!', orderID);
      // Reset form states if needed
      setFeedback('');
      setIssueDescription('');
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  const renderIssueForm = () => {
    return (
      <View>
        <Text style={styles.issueDescriptionText}>Issue Description: </Text>
        <TextInput
          style={styles.input}
          value={issueDescription}
          onChangeText={setIssueDescription}
          placeholder="Describe the issue"
        />
        <View style={styles.cameraContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.cameraButton}> 
            <Text style={styles.cameraText}>Attach Proof for better Assessment</Text>
            <Icon name="camera" size={24} color="black"/>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>
      </View>
    );
  };

  return (
    <Modal visible={isModal} transparent={true} animationType="none">
      <Animated.View
        style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}
      >
        {/* Close Button */}
        <Pressable onPress={() => setIsModal(false)}>
          <Text style={styles.closeButton}>X</Text>
        </Pressable>

        <Text style={styles.modalTitle}>Your Feedback</Text>
        <TextInput
          style={styles.input}
          value={feedback}
          onChangeText={setFeedback}
          placeholder="Your feedback here"
        />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => setRaiseIssue((prev) => !prev)} style={styles.raiseIssueButton}>
            <Text style={styles.raiseIssueText}>Raise an Issue</Text>
          </TouchableOpacity>

          {raiseIssue && renderIssueForm()}

          <TouchableOpacity onPress={handleFeedbackSubmit} style={styles.submitButton}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    width: '100%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0, // Position it at the bottom
  },
  closeButton: {
    fontSize: 30,
    color: '#FF0000',
    alignSelf: 'flex-end',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    marginVertical: 12,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  buttonsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  raiseIssueButton: {
    backgroundColor: 'red', // Red background
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  raiseIssueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  issueDescriptionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  submitButton: {
    backgroundColor: 'green',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cameraContainer: {
    flexDirection: 'column',  // Adjust the layout to stack the button and image
    alignItems: 'flex-start', // Ensure items are aligned to the start (left)
    marginTop: 10,
  },
  cameraButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cameraText: {
    marginRight: 10,
    fontSize: 16,
    color: '#333',
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 10,
    marginBottom: 10,
    resizeMode: 'cover',  // Keep the aspect ratio while maintaining the original image dimensions
    borderRadius: 8,
  },
});

export default FeedbackModal;
