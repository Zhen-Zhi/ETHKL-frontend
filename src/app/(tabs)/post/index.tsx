import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, Animated, Modal } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

interface Post {
  id: number;
  restaurant: string;
  description: string;
}

interface Review {
  owner: string;
  text: string;
  date: string;
  rating: number; // Add rating to the Review interface
}

const PostScreen: React.FC = () => {
  const posts: Post[] = [
    { id: 1, restaurant: 'Restaurant 1', description: 'Delicious food with great ambiance.' },
    { id: 2, restaurant: 'Restaurant 2', description: 'Amazing sushi and friendly staff.' },
    { id: 3, restaurant: 'Restaurant 3', description: 'Best pizza in town!' },
    { id: 4, restaurant: 'Restaurant 4', description: 'Asam Pedas the best!' },
    { id: 5, restaurant: 'Restaurant 5', description: 'Best pizza in town!' },
    { id: 6, restaurant: 'Restaurant 6', description: 'Asam Pedas the best!' },
  ];

  const [reviews, setReviews] = useState<{ [key: number]: Review[] }>({
    1: [
      { owner: 'User 1', text: 'Great place to dine!', date: '2024-09-20', rating: 5 },
      { owner: 'User 2', text: 'The ambiance was lovely.', date: '2024-09-21', rating: 4 },
    ],
    2: [
      { owner: 'User 3', text: 'Best sushi I’ve ever had!', date: '2024-09-22', rating: 5 },
    ],
    3: [],
    4: [
      { owner: 'User 4', text: 'A must-try for seafood lovers!', date: '2024-09-23', rating: 4 },
    ],
    5: [],
    6: [],
  });

  const [newReview, setNewReview] = useState({ text: '', imageUrl: '', rating: 0 });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const slideAnimation = useState(new Animated.Value(0))[0];

  const handleSubmitReview = () => {
    if (!newReview.text || newReview.rating === 0) return; // Check if rating is selected

    const newReviewData: Review = {
      owner: 'User', // Placeholder for the owner's name; you can customize this as needed.
      text: newReview.text,
      date: new Date().toLocaleDateString(),
      rating: newReview.rating, // Include rating in the review
    };

    setReviews(prev => ({ ...prev, [selectedPostId!]: [...prev[selectedPostId!], newReviewData] }));
    setNewReview({ text: '', imageUrl: '', rating: 0 });
  };

  const openCommentsModal = (id: number) => {
    setSelectedPostId(id);
    setModalVisible(true);
    slideAnimation.setValue(0);
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeCommentsModal = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  // Function to handle star rating selection
  const handleRating = (value: number) => {
    setNewReview({ ...newReview, rating: value });
  };

  return (
    <ScrollView style={styles.container}>
      {posts.map(post => (
        <View key={post.id} style={styles.post}>
          <Text style={styles.restaurantName}>{post.restaurant}</Text>
          <Text style={styles.description}>{post.description}</Text>
          <View style={styles.actionContainer}>
            <TouchableOpacity onPress={() => openCommentsModal(post.id)}>
              <MaterialIcons name="comment" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="share" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="none"
        onRequestClose={closeCommentsModal}
      >
        <View style={styles.modalBackground}>
          <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnimation.interpolate({ inputRange: [0, 1], outputRange: [300, 0] }) }] }]}>

            <TouchableOpacity style={styles.closeButton} onPress={closeCommentsModal}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>

            <ScrollView style={styles.reviewContainer}>
              {selectedPostId !== null && reviews[selectedPostId].map((review, index) => (
                <View key={index} style={styles.review}>
                  <Text style={styles.reviewOwner}>{review.owner}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                  <Text style={styles.reviewText}>{review.text}</Text>
                  <Text style={styles.reviewRating}>Rating: {review.rating} ★</Text>
                </View>
              ))}
            </ScrollView>

            <Text style={styles.sectionHeader}>Write Review on {selectedPostId !== null ? posts[selectedPostId - 1].restaurant : ''}</Text>

            {/* Star Rating Component */}
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map(value => (
                <TouchableOpacity key={value} onPress={() => handleRating(value)}>
                  <MaterialIcons name="star" size={30} color={newReview.rating >= value ? '#FFD700' : '#ccc'} />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Write your review..."
                multiline
                value={newReview.text}
                onChangeText={(text) => setNewReview({ ...newReview, text, rating: newReview.rating })}
              />
              <TextInput
                style={styles.input}
                placeholder="Image URL (optional)..."
                value={newReview.imageUrl}
                onChangeText={(text) => setNewReview({ ...newReview, imageUrl: text, rating: newReview.rating })}
              />
              <Button
                title="Submit Review"
                onPress={handleSubmitReview}
              />
            </View>
          </Animated.View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  post: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
    color: '#555',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    height: '60%',
  },
  reviewContainer: {
    maxHeight: 300,
    marginBottom: 20,
  },
  review: {
    marginTop: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f0f8ff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  reviewOwner: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  reviewDate: {
    fontSize: 12,
    color: '#777',
  },
  reviewText: {
    fontSize: 14,
  },
  reviewRating: {
    fontSize: 14,
    color: '#FFD700',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  inputContainer: {
    marginTop: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#333',
  },
});

export default PostScreen;
