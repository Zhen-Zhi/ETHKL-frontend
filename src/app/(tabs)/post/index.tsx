import { StyleSheet, Text, View, TextInput, ScrollView, FlatList, TouchableOpacity, Animated, Modal, Image, TouchableWithoutFeedback, Pressable, ImageBackground, Keyboard } from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import AnimatedPressable from '@/src/components/AnimatedPressable';
import * as ImagePicker from 'expo-image-picker';
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { createThirdwebClient, getContract, defineChain } from "thirdweb";

// Define Post interface
interface Post {
  id: number;
  restaurant: string;
  description: string;
}

export const client = createThirdwebClient({
  clientId: "e7b69c7855dcb38648d1f79dcb8be7ad"
});

// connect to your contract
export const contract = getContract({
  client,
  chain: defineChain(534351),
  address: "0xE68501AA2ffeC1a3542686AAD5F850176166c204",
});

const PostScreen: React.FC = () => {
  const posts: Post[] = [
    { id: 1, restaurant: 'Restaurant 1', description: 'Delicious food with great ambiance.' },
    { id: 2, restaurant: 'Restaurant 2', description: 'Amazing sushi and friendly staff.' },
    { id: 3, restaurant: 'Restaurant 3', description: 'Best pizza in town!' },
    { id: 4, restaurant: 'Restaurant 4', description: 'Asam Pedas the best!' },
    { id: 5, restaurant: 'Restaurant 5', description: 'Best pizza in town!' },
  ];

  const { mutate: sendTransaction } = useSendTransaction();

  // Selected restaurantId will be updated when the user selects a restaurant
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<number | null>(null);
  const [newReview, setNewReview] = useState({ text: '', imageUrl: '', rating: 0 });
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState<string[] | null>(null);

  // Pick an image from gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 4],
      quality: 0.5,
      allowsMultipleSelection: true
    });

    if (!result.canceled) {
      setImage((prevImages) => [
        ...(prevImages ?? []),
        ...result.assets.map((asset) => asset.uri)
      ]);
    }
  };

  const removeImage = (uri: string) => {
    if (image) {
      setImage(image.filter((img) => img !== uri));
    }
  };

  // Function to handle star rating selection
  const handleRating = (value: number) => {
    setNewReview({ ...newReview, rating: value });
  };

  const submitReview = () => {
    console.log("Submitting review...");
    
    // Check for empty fields
    if (selectedRestaurantId === null || newReview.text === '' || image.length === 0) {
      console.error("All required fields are not filled");
      console.log({
        selectedRestaurantId,
        reviewText: newReview.text,
        image,
      });
      return;
    }
  
    console.log("All fields filled. Preparing transaction...");
  
    const _restaurantId = BigInt(selectedRestaurantId); // Convert to BigInt
    const _reviewText = newReview.text;
    
    // Use the first selected image as the image link
    const _imageLink = image[0]; // Get the first selected image URI
  
    // Log the data being passed to the contract
    console.log("Review details before transaction preparation:", {
      restaurantId: _restaurantId.toString(), // Converting BigInt to string for logging
      reviewText: _reviewText,
      imageLink: _imageLink,
    });
  
    // Prepare the transaction
    const transaction = prepareContractCall({
      contract,
      method: "function submitReview(uint256 _restaurantId, string _reviewText, string _imageLink)",
      params: [_restaurantId, _reviewText, _imageLink],
    });
  
    // Log the transaction details
    console.log("Transaction prepared:", transaction);
  
    // Send the transaction
    sendTransaction(transaction, {
      onSuccess: (result) => {
        console.log("Transaction successful:", result);
        alert("Review submitted successfully!");
      },
      onError: (error) => {
        console.error("Transaction failed:", error);
        alert("There was an error submitting your review.");
      },
    });
  };
  
  return (
    <View className='flex-1'>
      <ScrollView className='flex-1 p-4 bg-slate-100'>
        <Text className='font-extrabold text-2xl mx-1 mb-3'>Select a restaurant</Text>
        {posts.map(post => (
          <AnimatedPressable 
            className='flex-1 border border-slate-400 mb-5 rounded-3xl' 
            pressInValue={0.98} 
            key={post.id}
            onPress={() => {
              setSelectedRestaurantId(post.id); // Save the selected restaurant ID
              setModalVisible(true);
            }}
          >
            <Image
              className='w-full h-48 rounded-t-3xl'
              source={require('@asset/images/title.png')}
            />
            <View className='mx-3 p-2'>
              <Text className='text-xl font-bold'>{post.restaurant}</Text>
              <Text className=''>{post.description}</Text>
            </View>
          </AnimatedPressable>
        ))}
      </ScrollView>

      {/* Modal section */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        presentationStyle='overFullScreen'
      >
        <Pressable onPress={() => setModalVisible(false)} className='bg-black/30 flex-1 justify-end'>
          <Pressable onPress={(event) => {event.stopPropagation(); Keyboard.dismiss();}} className='bg-white rounded-t-3xl p-4'>
            <Text className='my-auto' style={styles.sectionHeader}>Submit Your Review</Text>

            {/* Star Rating Component */}
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map(value => (
                <AnimatedPressable pressInValue={0.9} key={value} onPress={() => handleRating(value)}>
                  <MaterialIcons name="star" size={30} color={newReview.rating >= value ? '#FFD700' : '#ccc'} />
                </AnimatedPressable>
              ))}
            </View>

            {/* Image Upload */}
            {image && image.length > 0 ? (
              <FlatList
                data={image}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View>
                    <ImageBackground
                      source={{ uri: item }}
                      style={{ width: 100, height: 100, margin: 5 }}
                    >
                      <AnimatedPressable
                        pressInValue={0.95}
                        className='rounded-full bg-white w-[24px]'
                        onPress={() => removeImage(item)}
                      >
                        <Entypo name="cross" size={24} color="black" />
                      </AnimatedPressable>
                    </ImageBackground>
                  </View>
                )}
                numColumns={3}
              />
            ) : (
              <AnimatedPressable 
                pressInValue={0.95} 
                className='mx-auto border border-slate-300 py-8 px-12 rounded-lg'
                onPress={pickImage}
              >
                <MaterialIcons name="photo-camera" size={56} color="black" />
              </AnimatedPressable>
            )}

            {/* Review Input */}
            <View style={styles.inputContainer}>
              <Text className='text-lg font-semibold m-1'>
                Provide your review here
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Write your review..."
                multiline
                value={newReview.text}
                onChangeText={(text) => setNewReview({ ...newReview, text })}
              />
            </View>

            {/* Submit Review Button */}
            <View className='mt-6'>
              <AnimatedPressable
                className='bg-blue-500 p-3 rounded-lg'
                pressInValue={0.9}
                onPress={submitReview} // Trigger the review submission
              >
                <Text className='font-semibold text-lg text-white text-center'>Post Review</Text>
              </AnimatedPressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    height: 100,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default PostScreen;
